import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { betterFetch } from "@better-fetch/fetch";
import { type Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1. Check for Auth
   const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      },
    );

  const pathname = request.nextUrl.pathname;

  // Regex to strip locale
  // Matches /fr/..., /en/..., /es/... or just /fr
  const localePattern = /^\/(?:fr|en|es)/;
  const pathWithoutLocale = pathname.replace(localePattern, '') || '/';

  const isProtectedRoute =
       pathWithoutLocale.startsWith("/dashboard") ||
       pathWithoutLocale.startsWith("/workspace") ||
       pathWithoutLocale.startsWith("/admin") ||
       pathWithoutLocale.startsWith("/mentor") ||
       pathWithoutLocale.startsWith("/judge");

  const isAuthPage =
      pathWithoutLocale.startsWith("/login") ||
      pathWithoutLocale.startsWith("/register");

  // Determine current locale to maintain it in redirects
  const localeMatch = pathname.match(localePattern);
  const currentLocale = localeMatch ? localeMatch[0].replace('/', '') : routing.defaultLocale;

  if (!session && isProtectedRoute) {
       return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
  }

  if (session && isAuthPage) {
      return NextResponse.redirect(new URL(`/${currentLocale}/dashboard`, request.url));
  }

  // 2. Run next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|en|es)/:path*']
};
