'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type User = {
  id: string
  email: string
  full_name: string
  role: 'student' | 'teacher' | 'admin'
  status: 'active' | 'inactive' | 'pending' | 'unconfirmed'
  profile_image_url?: string
  bio?: string
  subject?: string
  grade?: string
  class?: string
  phone_number?: string
  created_at?: string
  updated_at?: string
}

type FormData = {
  full_name: string
  phone_number: string
  bio: string
  subject?: string
  grade?: string
  class?: string
}

const PHONE_REGEX = /^\+?[\d\s-]{10,}$/
const NAME_REGEX = /^[a-zA-Z\s]{2,50}$/

export default function ProfileCompletionPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    phone_number: '',
    bio: '',
    subject: '',
    grade: '',
    class: '',
  })
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({})
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          toast.error('Failed to get session')
          throw sessionError
        }
        
        if (!session) {
          router.push('/auth/login')
          return
        }

        // First check if user exists
        const { data: existingUser, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle()

        if (userError) {
          toast.error('Failed to fetch user data')
          throw userError
        }

        // If user has completed profile, redirect to dashboard
        if (existingUser?.full_name && existingUser?.phone_number) {
          router.push('/dashboard')
          return
        }

        // If user doesn't exist, create a new user record
        if (!existingUser) {
          const { data: newUser, error: createError } = await supabase
            .from('users')
            .insert([
              {
                id: session.user.id,
                email: session.user.email,
                role: 'student', // Default role
                status: 'pending',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }
            ])
            .select()
            .single()

          if (createError) {
            toast.error('Failed to create user profile')
            throw createError
          }

          setUser(newUser)
        } else {
          setUser(existingUser)
        }

        setFormData({
          full_name: existingUser?.full_name || '',
          phone_number: existingUser?.phone_number || '',
          bio: existingUser?.bio || '',
          subject: existingUser?.subject || '',
          grade: existingUser?.grade || '',
          class: existingUser?.class || '',
        })
      } catch (err: any) {
        toast.error(err.message || 'An error occurred')
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [router, supabase])

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {}
    
    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required'
    } else if (!NAME_REGEX.test(formData.full_name)) {
      errors.full_name = 'Full name must be 2-50 characters and contain only letters and spaces'
    }
    
    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Phone number is required'
    } else if (!PHONE_REGEX.test(formData.phone_number)) {
      errors.phone_number = 'Please enter a valid phone number (e.g., +1234567890)'
    }

    if (user?.role === 'teacher' && !formData.subject?.trim()) {
      errors.subject = 'Subject is required for teachers'
    }

    if (user?.role === 'student') {
      if (!formData.grade?.trim()) {
        errors.grade = 'Grade is required for students'
      }
      if (!formData.class?.trim()) {
        errors.class = 'Class is required for students'
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the validation errors')
      return
    }

    setSaving(true)

    try {
      const now = new Date().toISOString()
      const updateData = {
        full_name: formData.full_name.trim(),
        phone_number: formData.phone_number.trim(),
        bio: formData.bio.trim(),
        subject: formData.subject?.trim(),
        grade: formData.grade?.trim(),
        class: formData.class?.trim(),
        status: 'active',
        updated_at: now,
      }

      const { error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user?.id)

      if (updateError) {
        console.error('Update error:', updateError)
        toast.error('Failed to update profile')
        throw updateError
      }

      // If user is a teacher, ensure they exist in the teachers table
      if (user?.role === 'teacher') {
        const { error: teacherError } = await supabase
          .from('teachers')
          .upsert({
            user_id: user.id,
            subject: formData.subject?.trim(),
            created_at: now,
            updated_at: now,
          })

        if (teacherError) {
          console.error('Teacher update error:', teacherError)
          toast.error('Failed to update teacher profile')
          throw teacherError
        }
      }

      // If user is a student, ensure they exist in the students table
      if (user?.role === 'student') {
        const { error: studentError } = await supabase
          .from('students')
          .upsert({
            user_id: user.id,
            grade: formData.grade?.trim(),
            class: formData.class?.trim(),
            created_at: now,
            updated_at: now,
          })

        if (studentError) {
          console.error('Student update error:', studentError)
          toast.error('Failed to update student profile')
          throw studentError
        }
      }

      toast.success('Profile completed successfully')
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Save error:', err)
      toast.error(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please provide the following information to continue
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name *
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    validationErrors.full_name ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                  placeholder="Enter your full name"
                  maxLength={50}
                />
                {validationErrors.full_name && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.full_name}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number *
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    validationErrors.phone_number ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                  placeholder="+1234567890"
                />
                {validationErrors.phone_number && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.phone_number}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Tell us about yourself"
                  maxLength={500}
                />
              </div>
            </div>

            {user?.role === 'teacher' && (
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      validationErrors.subject ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                    placeholder="Enter your subject"
                  />
                  {validationErrors.subject && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.subject}</p>
                  )}
                </div>
              </div>
            )}

            {user?.role === 'student' && (
              <>
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Grade *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        validationErrors.grade ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                      placeholder="Enter your grade"
                    />
                    {validationErrors.grade && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.grade}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Class *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="class"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        validationErrors.class ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                      placeholder="Enter your class"
                    />
                    {validationErrors.class && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.class}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={saving}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Complete Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 