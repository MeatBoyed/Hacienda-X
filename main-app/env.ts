import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Supabase
    DIRECT_URL: z.string().url(),
    DATABASE_URL: z.string().url(),

    // Clerk
    CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    // WEBHOOK_SECRET: z.string().min(1),

    // Posthog
    PRIVATE_POSTHOG_KEY: z.string().min(1),

    // AWS
    S3_ACCESS_KEY: z.string().min(1), // TODO Remove
    S3_SECRET_ACCESS_KEY: z.string().min(1), // TODO Remove
    AWS_BUCKET_NAME: z.string().min(1),
    AWS_BUCKET_REGION: z.string().min(1),
    AWS_BUCKET_ACCESS_KEY: z.string().min(1),
    AWS_BUCKET_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_BUCKET_PRODUCTION_FOLDER: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_HOST_URL: z.string().url(),

    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),

    // POSTHOG
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),

    // MapBox & Maps
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),

    // AWS

    // TODO: Remove!
    NEXT_PUBLIC_S3_BUCKET_NAME: z.string().min(1), // TODO: Remove
    NEXT_PUBLIC_S3_BUCKET_LOCATION: z.string().min(1), // TODO: Remove
    NEXT_PUBLIC_AWS_S3_BASE_URL: z.string().url(), // TODO: Remove
    NEXT_PUBLIC_AWS_BASE_URL: z.string().min(1),
  },
  //   For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    NEXT_PUBLIC_S3_BUCKET_LOCATION: process.env.NEXT_PUBLIC_S3_BUCKET_LOCATION,
    NEXT_PUBLIC_AWS_S3_BASE_URL: process.env.NEXT_PUBLIC_AWS_S3_BASE_URL, // TODO: Remove
    NEXT_PUBLIC_AWS_BASE_URL: process.env.NEXT_PUBLIC_AWS_BASE_URL,
  },
});
