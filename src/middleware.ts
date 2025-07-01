import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = [
    '/add-event',
    '/my-events',
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtected) {

        const refreshToken = request.cookies.get('join-up-refreshToken')?.value;
        if (!refreshToken) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }
    return NextResponse.next();
}

// Matcher for protected routes
export const config = {
    matcher: ['/add-event/:path*', '/my-events/:path*', "/events/:path*"],
}; 