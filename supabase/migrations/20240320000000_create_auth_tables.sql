-- Create teachers table
create table public.teachers (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  email text not null,
  full_name text not null,
  role text check (role in ('admin', 'teacher')) default 'teacher',
  status text check (status in ('active', 'inactive', 'pending')) default 'pending',
  school_id uuid,
  subject text,
  bio text,
  profile_image_url text,
  phone_number text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login timestamp with time zone,
  is_admin boolean default false,
  admin_permissions jsonb default '{}'::jsonb
);

-- Create students table
create table public.students (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  email text not null,
  full_name text not null,
  role text check (role = 'student') default 'student',
  school_id uuid,
  grade text,
  class text,
  profile_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login timestamp with time zone,
  progress jsonb default '{}'::jsonb,
  preferences jsonb default '{}'::jsonb
);

-- Enable RLS
alter table public.teachers enable row level security;
alter table public.students enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Teachers can view their own profile" on public.teachers;
drop policy if exists "Teachers can update their own profile" on public.teachers;
drop policy if exists "Admins can view all teachers" on public.teachers;
drop policy if exists "Admins can update all teachers" on public.teachers;

-- Create new policies for teachers table
create policy "Teachers can view their own profile"
  on public.teachers for select
  using (auth.uid() = user_id);

create policy "Teachers can update their own profile"
  on public.teachers for update
  using (auth.uid() = user_id);

create policy "Admins can view all teachers"
  on public.teachers for select
  using (
    exists (
      select 1 from public.teachers
      where user_id = auth.uid()
      and is_admin = true
    )
  );

create policy "Admins can update all teachers"
  on public.teachers for update
  using (
    exists (
      select 1 from public.teachers
      where user_id = auth.uid()
      and is_admin = true
    )
  );

-- Create policies for students table
create policy "Students can view their own profile"
  on public.students for select
  using (auth.uid() = user_id);

create policy "Students can update their own profile"
  on public.students for update
  using (auth.uid() = user_id);

create policy "Teachers can view their students"
  on public.students for select
  using (
    exists (
      select 1 from public.teachers
      where user_id = auth.uid()
      and status = 'active'
    )
  );

-- Create indexes for better performance
create index teachers_user_id_idx on public.teachers(user_id);
create index teachers_email_idx on public.teachers(email);
create index teachers_status_idx on public.teachers(status);
create index teachers_is_admin_idx on public.teachers(is_admin);

create index students_user_id_idx on public.students(user_id);
create index students_email_idx on public.students(email);
create index students_school_id_idx on public.students(school_id); 