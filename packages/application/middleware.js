import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!token || !refreshToken) return NextResponse.redirect(new URL('/auth', request.url));
}

export const config = {
  matcher: ['/edit/:path*', '/test/:path*', '/'],
};
