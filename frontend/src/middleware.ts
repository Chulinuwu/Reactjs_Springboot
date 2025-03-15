import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse {
  const path = request.nextUrl.pathname;
  const isLoggedIn = request.cookies.get('auth-token')?.value;

  // If the user is not logged in, redirect to the register page
  if (!isLoggedIn) {
    if (path !== '/register' && path !== '/login') {
      return NextResponse.redirect(new URL('/register', request.url));
    }
  } else {
    // If the user is logged in, redirect to the home page
    if (path === '/login' || path === '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/'], 
};
