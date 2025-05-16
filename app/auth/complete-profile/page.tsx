'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type FormData = {
  full_name: string
  bio: string
  school: string
  grade?: string
  subjects?: string[]
}

type FormErrors = {
  full_name?: string
  bio?: string
  school?: string
  grade?: string
  subjects?: string
}

export default function CompleteProfilePage() {
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    bio: '',
    school: '',
    grade: '',
    subjects: [],
  })
  const [loading, setLoading] = useState(false)
  const [userRole, setUserRole] = useState<'student' | 'teacher' | null>(null)
  const [validationErrors, setValidationErrors] = useState<FormErrors>({})
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user role:', error)
        toast.error('Failed to fetch user role')
        return
      }

      setUserRole(userData.role)
    }

    getUserRole()
  }, [supabase, router])

  const validateForm = async (): Promise<boolean> => {
    const errors: FormErrors = {}

    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required'
    } else if (formData.full_name.trim().length < 2) {
      errors.full_name = 'Full name must be at least 2 characters'
    }

    if (!formData.school.trim()) {
      errors.school = 'School is required'
    } else if (formData.school.trim().length < 2) {
      errors.school = 'School name must be at least 2 characters'
    }

    if (formData.bio && formData.bio.length > 500) {
      errors.bio = 'Bio must be less than 500 characters'
    }

    // Get user role from auth metadata
    const { data: { user } } = await supabase.auth.getUser()
    const role = user?.user_metadata?.role

    if (role === 'teacher') {
      if (!formData.subjects?.length) {
        errors.subjects = 'At least one subject is required'
      }
    } else {
      if (!formData.grade) {
        errors.grade = 'Grade is required'
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!(await validateForm())) {
        toast.error('Please fix the validation errors')
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      // Update user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name.trim(),
          bio: formData.bio.trim(),
          school: formData.school.trim(),
          ...(userRole === 'teacher' ? { subjects: formData.subjects } : { grade: formData.grade }),
        })
        .eq('id', user.id)

      if (profileError) {
        console.error('Profile update error:', profileError)
        toast.error('Failed to update profile')
        return
      }

      toast.success('Profile completed successfully!')
      router.push(userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student')
    } catch (err: any) {
      console.error('Profile completion error:', err)
      toast.error(err.message || 'An error occurred while completing your profile')
    } finally {
      setLoading(false)
    }
  }

  if (!userRole) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Please provide the following information to complete your profile
          </p>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      validationErrors.full_name ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                  />
                  {validationErrors.full_name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.full_name}</p>
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
                    name="bio"
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      validationErrors.bio ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                  />
                  {validationErrors.bio && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.bio}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                School
              </label>
              <div className="mt-1">
                <input
                  id="school"
                  name="school"
                  type="text"
                  required
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    validationErrors.school ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                />
                {validationErrors.school && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.school}</p>
                )}
              </div>
            </div>

            {userRole === 'teacher' ? (
              <div>
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subjects
                </label>
                <div className="mt-1">
                  <select
                    id="subjects"
                    name="subjects"
                    multiple
                    required
                    value={formData.subjects}
                    onChange={(e) => setFormData({
                      ...formData,
                      subjects: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      validationErrors.subjects ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                  >
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                    <option value="art">Art</option>
                    <option value="music">Music</option>
                    <option value="pe">Physical Education</option>
                  </select>
                  {validationErrors.subjects && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.subjects}</p>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Grade
                  </label>
                  <div className="mt-1">
                    <select
                      id="grade"
                      name="grade"
                      required
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className={`appearance-none block w-full px-3 py-2 border ${
                        validationErrors.grade ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white sm:text-sm`}
                    >
                      <option value="">Select a grade</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                    {validationErrors.grade && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{validationErrors.grade}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Completing profile...
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