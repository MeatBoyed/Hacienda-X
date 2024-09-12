import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
});

const isProtectedRoute = createRouteMatcher(["/:locale/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const path = req.nextUrl.pathname;

  // do not localize api routes
  if (path.includes("/api")) {
    return;
  }

  return intlMiddleware(req);
});

export const config = {
  // (OLD) Matching all routes (Including API route and "/")
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/property-for-sale(.*)", "/api/webhooks(.*)", "/(api|trpc)(.*)"],

  // Math all routes and api routes
  matcher: [
    "/((?!.*\\..*|_next).*)",
    // Webhook - allow all as POST requests aren't authed
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    "/(api|trpc)(.*)",
  ],
};
