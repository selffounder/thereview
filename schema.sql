-- Start transaction
BEGIN;

-- Drop everything first in correct order with proper error handling
DO $$ 
BEGIN
    -- Drop views
    DROP VIEW IF EXISTS public.user_profiles;
    
    -- Drop triggers
    DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
    
    -- Drop functions
    DROP FUNCTION IF EXISTS public.update_updated_at_column();
    
    -- Drop policies
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
    
    -- Drop tables
    DROP TABLE IF EXISTS public.profiles;
    
    -- Drop types
    DROP TYPE IF EXISTS public.user_role;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error during cleanup: %', SQLERRM;
        RAISE;
END $$;

-- Set search path
SET search_path TO public;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create user_role enum
CREATE TYPE public.user_role AS ENUM ('teacher', 'student');

-- Create update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language plpgsql;

-- Create the profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    role user_role NOT NULL,
    bio TEXT,
    school TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT valid_full_name CHECK (length(full_name) >= 2),
    CONSTRAINT valid_school CHECK (length(school) >= 2)
);

-- Create trigger to update updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_school ON public.profiles(school);

-- Create comments
COMMENT ON TABLE public.profiles IS 'Stores user profile information';
COMMENT ON COLUMN public.profiles.role IS 'User role: teacher or student';
COMMENT ON COLUMN public.profiles.school IS 'User''s school name';
COMMENT ON COLUMN public.profiles.bio IS 'User''s biography';

-- Grant access to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Commit transaction
COMMIT; 