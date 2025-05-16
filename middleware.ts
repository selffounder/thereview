import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from './types/supabase'

// Cache user profile data for 5 minutes
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds
const userProfileCache = new Map<string, { data: any; timestamp: number }>()

// Clear cache periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of userProfileCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      userProfileCache.delete(key)
    }
  }
}, CACHE_DURATION)

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Auth routes handling
  if (req.nextUrl.pathname.startsWith('/auth')) {
    if (session) {
      // If user is logged in and tries to access auth pages, redirect to appropriate dashboard
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profile) {
        return NextResponse.redirect(new URL(`/dashboard/${profile.role}`, req.url))
      }
    }
    return res
  }

  // Protected routes handling
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Check if user profile exists
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Check if user is accessing the correct dashboard
    const role = req.nextUrl.pathname.split('/')[2]
    if (role !== profile.role) {
      return NextResponse.redirect(new URL(`/dashboard/${profile.role}`, req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
} 