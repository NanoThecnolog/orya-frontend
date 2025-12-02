import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value

    if (!token || token.split('.').length !== 3) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/me/:path*']
}
/*export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const inConstruction = false

    if (!inConstruction) return NextResponse.next()

    if (pathname.startsWith("/construcao")) {
        return NextResponse.next();
    }

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    return NextResponse.rewrite(new URL("/construcao", req.url));
    //return NextResponse.next()
}

export const config = {
    matcher: ["/:path*"]
};*/