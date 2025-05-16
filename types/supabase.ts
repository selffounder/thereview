export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      teachers: {
        Row: {
          id: string
          user_id: string
          email: string
          full_name: string
          role: 'admin' | 'teacher'
          status: 'active' | 'inactive' | 'pending'
          school_id: string | null
          subject: string | null
          bio: string | null
          profile_image_url: string | null
          phone_number: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          is_admin: boolean
          admin_permissions: Json
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          full_name: string
          role?: 'admin' | 'teacher'
          status?: 'active' | 'inactive' | 'pending'
          school_id?: string | null
          subject?: string | null
          bio?: string | null
          profile_image_url?: string | null
          phone_number?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_admin?: boolean
          admin_permissions?: Json
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          full_name?: string
          role?: 'admin' | 'teacher'
          status?: 'active' | 'inactive' | 'pending'
          school_id?: string | null
          subject?: string | null
          bio?: string | null
          profile_image_url?: string | null
          phone_number?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_admin?: boolean
          admin_permissions?: Json
        }
      }
      students: {
        Row: {
          id: string
          user_id: string
          email: string
          full_name: string
          role: 'student'
          school_id: string | null
          grade: string | null
          class: string | null
          profile_image_url: string | null
          created_at: string
          updated_at: string
          last_login: string | null
          progress: Json
          preferences: Json
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          full_name: string
          role?: 'student'
          school_id?: string | null
          grade?: string | null
          class?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          progress?: Json
          preferences?: Json
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          full_name?: string
          role?: 'student'
          school_id?: string | null
          grade?: string | null
          class?: string | null
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
          last_login?: string | null
          progress?: Json
          preferences?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'teacher' | 'student'
      teacher_status: 'active' | 'inactive' | 'pending'
    }
  }
} 