import "./globals.css";
import PostHogClient from "@/components/Posthog";
import Providers from "@/components/Providers/Providers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default async function NotFoundPage({ locale }: { locale: string }) {
  return (
    <html lang={locale}>
      <head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        ></script>
      </head>
      <Providers locale={locale}>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased flex justify-center items-center flex-col",
            inter
          )}
        >
          <Card>
            <CardHeader>
              <CardTitle>Page Not Found</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription>Woops! Looks like this page doesn&apos;t exist</CardDescription>
              <Link href="/">Return Home</Link>
            </CardContent>
          </Card>
        </body>
        <GoogleAnalytics gaId="G-8V781NCSR4" />
      </Providers>
    </html>
  );
}
