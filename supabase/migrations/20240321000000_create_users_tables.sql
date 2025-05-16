-- Drop existing tables if they exist
drop table if exists public.students cascade;
drop table if exists public.teachers cascade;
drop table if exists public.users cascade;

-- Create user_role enum if it doesn't exist
do $$ begin
  create type user_role as enum ('admin', 'teacher', 'student');
exception
  when duplicate_object then null;
end $$;

-- Create users table
create table public.users (
  id uuid primary key not null references auth.users(id),
  email text unique not null,
  full_name text not null,
  role user_role not null default 'student'::user_role,
  status text check (status in ('active', 'inactive', 'pending', 'unconfirmed')) default 'unconfirmed',
  school_id uuid,
  subject text,
  bio text,
  profile_image_url text,
  phone_number text,
  grade text,
  class text,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone('utc'::text, now()),
  last_login timestamp with time zone,
  progress jsonb default '{}'::jsonb,
  preferences jsonb default '{}'::jsonb
);

-- Enable RLS
alter table public.users enable row level security;

-- Create admin check function
create or replace function is_admin(user_id uuid)
returns bool as $$
begin
  perform
  from public.users
  where id = user_id and role = 'admin'::user_role;
  return found;
end;
$$ language plpgsql security definer;

-- Create active teacher check function
create or replace function is_active_teacher(user_id uuid)
returns bool as $$
begin
  perform
  from public.users
  where id = user_id 
    and role = 'teacher'::user_role 
    and status = 'active';
  return found;
end;
$$ language plpgsql security definer;

-- Create email confirmed check function
create or replace function is_email_confirmed(user_id uuid)
returns bool as $$
begin
  perform
  from auth.users
  where id = user_id and email_confirmed_at is not null;
  return found;
end;
$$ language plpgsql security definer;

-- Drop existing policies if they exist
drop policy if exists "Users can view their own profile" on public.users;
drop policy if exists "Users can update their own profile" on public.users;
drop policy if exists "Users can insert their own profile" on public.users;
drop policy if exists "Admins can view all users" on public.users;
drop policy if exists "Admins can update all users" on public.users;
drop policy if exists "Admins can insert users" on public.users;
drop policy if exists "Teachers can view students" on public.users;

-- Create policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.users for insert
  with check (
    auth.uid() = id and
    auth.uid() is not null
  );

create policy "Admins can view all users"
  on public.users for select
  using (is_admin(auth.uid()));

create policy "Admins can update all users"
  on public.users for update
  using (is_admin(auth.uid()));

create policy "Admins can insert users"
  on public.users for insert
  with check (is_admin(auth.uid()));

create policy "Teachers can view students"
  on public.users for select
  using (
    is_active_teacher(auth.uid()) and
    role = 'student'::user_role
  );

-- Create indexes for better performance
create index if not exists users_id_idx on public.users(id);
create index if not exists users_email_idx on public.users(email);
create index if not exists users_role_idx on public.users(role);
create index if not exists users_status_idx on public.users(status);
create index if not exists users_school_id_idx on public.users(school_id);

-- Create trigger to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at
  before update on public.users
  for each row
  execute function update_updated_at_column();

-- Create function to handle email confirmation
create or replace function public.handle_email_confirmation()
returns trigger as $$
begin
  -- Update user status when email is confirmed
  update public.users
  set status = 'pending'
  where id = new.id
  and status = 'unconfirmed';
  
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for email confirmation
create trigger on_email_confirmed
  after update of email_confirmed_at on auth.users
  for each row
  when (old.email_confirmed_at is null and new.email_confirmed_at is not null)
  execute function public.handle_email_confirmation();



