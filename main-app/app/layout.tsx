import "./globals.css";
import { cn } from "@/components/ImagesInput/FileInputUtils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import PostHogClient from "@/components/Posthog";
import { auth } from "@clerk/nextjs/server";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Hacienda X",
  description: "....",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (userId) {
    const posthog = PostHogClient();
    posthog.identify({ distinctId: userId });
  }

  return (
    <html lang="en">
      <head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        ></script>
      </head>
      <Providers>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            inter
          )}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
