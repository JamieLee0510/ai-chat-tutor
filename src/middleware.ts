import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // TODO: currently redirect all path to /tutor/chat
    if (pathname !== "/tutor/chat") {
        return NextResponse.redirect(new URL("/tutor/chat", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
