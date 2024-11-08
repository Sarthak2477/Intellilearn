import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/auth/(.*)",
]

const publicRoutes = createRouteMatcher([
  ...AUTH_ROUTES,
]);

const authRoutes = createRouteMatcher([
  ...AUTH_ROUTES,
])

export default clerkMiddleware(async (auth, request) => {
  
  if ( !publicRoutes(request) ) {
    await auth.protect();
  } else if ( authRoutes(request) && (await auth()).userId !== null ) {
    // Don't allow signed in user to got in to authentication routes
    
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};