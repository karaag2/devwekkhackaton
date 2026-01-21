import { betterFetch } from "@better-fetch/fetch";
import { type Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const pathname = request.nextUrl.pathname;

  // Protect dashboard and other private routes
  if (
    !session &&
    (pathname.startsWith("/dashboard") ||
      pathname.startsWith("/workspace") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/mentor") ||
      pathname.startsWith("/judge"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from auth pages
  if (
    session &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/workspace/:path*",
    "/admin/:path*",
    "/mentor/:path*",
    "/judge/:path*",
    "/login",
    "/register",
  ],
};
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@/lib/auth";

// export default async function authMiddleware(request: NextRequest) {
//   const session = await auth.api.getSession({
//     headers: request.headers,
//   });

//   const pathname = request.nextUrl.pathname;

//   // Routes protégées
//   const protectedRoutes = [
//     "/dashboard",
//     "/workspace",
//     "/admin",
//     "/mentor",
//     "/judge",
//   ];

//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (!session && isProtected) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // Empêcher un user connecté d'accéder à login/register
//   if (
//     session &&
//     (pathname.startsWith("/login") || pathname.startsWith("/register"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }
// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/workspace/:path*",
//     "/admin/:path*",
//     "/mentor/:path*",
//     "/judge/:path*",
//     "/login",
//     "/register",
//   ],
// };
