import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }
    // TODO: currently redirect all path to /tutor/chat
    if (pathname !== "/tutor/chat") {
        return NextResponse.redirect(new URL("/tutor/chat", request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Apply middleware only to non-API and non-static file requests

    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
