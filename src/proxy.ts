import { NextRequest, NextResponse } from 'next/server'
import { safeEqual } from '@/lib/safe-equal'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  const token = request.cookies.get('admin_token')?.value
  const expectedToken = process.env.ADMIN_TOKEN

  if (!token || !expectedToken || !safeEqual(token, expectedToken)) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
