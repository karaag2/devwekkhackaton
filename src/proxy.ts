import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { betterFetch } from "@better-fetch/fetch";
import { type Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Regex to strip locale
  const localePattern = /^\/(?:fr|en|es)/;
  const pathWithoutLocale = pathname.replace(localePattern, '') || '/';

  // 1. Define route groups
  const isProtectedRoute =
       pathWithoutLocale.startsWith("/dashboard") ||
       pathWithoutLocale.startsWith("/workspace") ||
       pathWithoutLocale.startsWith("/admin") ||
       pathWithoutLocale.startsWith("/mentor") ||
       pathWithoutLocale.startsWith("/judge");

  const isAuthPage =
      pathWithoutLocale.startsWith("/login") ||
      pathWithoutLocale.startsWith("/register");

  // 2. PERFORMANCE: Early exit if the route doesn't need auth check
  if (!isProtectedRoute && !isAuthPage) {
    return intlMiddleware(request);
  }

  // 3. Only fetch session for sensitive routes
  const baseURL = process.env.NODE_ENV === "development" 
    ? "http://localhost:3000" 
    : request.nextUrl.origin;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // Determine current locale for redirects
  const localeMatch = pathname.match(localePattern);
  const currentLocale = localeMatch ? localeMatch[0].replace('/', '') : routing.defaultLocale;

  // 4. Handle Redirections
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL(`/${currentLocale}/dashboard`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Optimized matcher: Skip all internal files, static assets, and api routes (let them handle their own auth)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/', 
    '/(fr|en|es)/:path*'
  ]
};
