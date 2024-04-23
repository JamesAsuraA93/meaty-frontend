import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  //   console.log("first")

  //   // return NextResponse.redirect(new URL('/home', request.url))
  //   return NextResponse.next()

  const isProduction = process.env.NODE_ENV === 'production'

  // console.log(isProduction, 'isProduction')


  if (isProduction && request.url.includes('/dev')) {
    // console.log('redirecting to /')
    return NextResponse.redirect(new URL('/', request.url))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dev/:path*',
}