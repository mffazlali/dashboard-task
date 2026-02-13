import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const isPublicRoute = pathname === '/login';

  // Root path
  const isRootPath = pathname === '/';

  // If user is on root path
  if (isRootPath) {
    if (token) {
      // User is logged in, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      // User is not logged in, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If user is trying to access login page while already logged in
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is trying to access protected routes without token
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
