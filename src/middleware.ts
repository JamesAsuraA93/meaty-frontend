import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  const isProduction = process.env.NODE_ENV === 'production'


  if (isProduction && request.url.includes('/dev')) {

    return NextResponse.redirect(new URL('/', request.url))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dev/:path*',
}