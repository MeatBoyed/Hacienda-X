import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/property-for-sale",
    "/(api|trpc)(.*)",
  ],
};
