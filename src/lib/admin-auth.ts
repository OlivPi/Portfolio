'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { safeEqual } from '@/lib/safe-equal'

// Limite par IP : 5 échecs toutes les 15 minutes. Stockage en mémoire, donc
// réinitialisé à chaque nouvelle instance serverless.
const MAX_FAILED_ATTEMPTS = 5
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000
const failedAttempts = new Map<string, number[]>()

function recentFailures(ip: string): number[] {
  const now = Date.now()
  return (failedAttempts.get(ip) ?? []).filter(
    (t) => now - t < ATTEMPT_WINDOW_MS
  )
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  const expectedToken = process.env.ADMIN_TOKEN
  return !!token && !!expectedToken && safeEqual(token, expectedToken)
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) redirect('/admin/login')
}

export async function loginAction(formData: FormData) {
  const headerStore = await headers()
  const ip =
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  const failures = recentFailures(ip)
  if (failures.length >= MAX_FAILED_ATTEMPTS) {
    redirect('/admin/login?error=locked')
  }

  const password = formData.get('password')
  const expectedPassword = process.env.ADMIN_PASSWORD

  if (
    typeof password === 'string' &&
    expectedPassword &&
    safeEqual(password, expectedPassword)
  ) {
    failedAttempts.delete(ip)
    const cookieStore = await cookies()
    cookieStore.set('admin_token', process.env.ADMIN_TOKEN ?? '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    redirect('/admin/experiences')
  }

  failures.push(Date.now())
  failedAttempts.set(ip, failures)
  redirect('/admin/login?error=1')
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  redirect('/admin/login')
}
