import { baseLogger } from "@/lib/logging/server";
import { transformMiddlewareRequest } from "@axiomhq/nextjs";
import { getSessionCookie } from "better-auth/cookies";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  baseLogger.info(...transformMiddlewareRequest(request));

  const sessionCookie = getSessionCookie(request);

  // If user is not logged in and is not on the login page, redirect to login page
  if (!sessionCookie && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is logged in and is on the login page, redirect to home page
  if (sessionCookie && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  event.waitUntil(baseLogger.flush());
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|images|files|favicon.ico|sitemap.xml|robots.txt|webhook).*)"],
};
