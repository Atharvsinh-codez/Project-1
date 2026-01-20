import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only apply restrictions in production
  if (process.env.NODE_ENV === "production") {
    const { pathname } = request.nextUrl;

    // Define allowed paths
    const allowedPaths = [
      "/", // Landing page
      "/about", // About page
      "/contact", // Contact page
      "/api/waitlist", // Waitlist API endpoint
      "/api/newsletter", // Newsletter API endpoint
    ];

    // Allow explicitly allowed paths
    if (allowedPaths.includes(pathname)) {
      return NextResponse.next();
    }

    // Allow Next.js internal routes and static assets
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/images") ||
      pathname.startsWith("/favicon.ico") ||
      pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf|eot)$/)
    ) {
      return NextResponse.next();
    }

    // Block all other routes in production (including other API routes, auth pages, protected pages)
    return NextResponse.redirect(new URL("/", request.url));
  }

  // In development, allow all routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
