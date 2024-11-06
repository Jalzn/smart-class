import jwt from 'jsonwebtoken'
import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = cookies().get('token')

    if (!token) {
        if (request.nextUrl.pathname.startsWith('/auth')) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    if (token && request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}