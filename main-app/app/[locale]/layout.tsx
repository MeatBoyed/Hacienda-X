import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import PostHogClient from "@/components/Posthog";
import { auth } from "@clerk/nextjs/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Hacienda X",
  description: "....",
};

interface LocaleRootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleRootLayout({ children, params: { locale } }: Readonly<LocaleRootLayoutProps>) {
  const { userId } = await auth();

  if (userId) {
    const posthog = PostHogClient();
    posthog.identify({ distinctId: userId });
  }

  return (
    <html lang={locale}>
      <head>
        <script
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        ></script>
      </head>
      <Providers locale={locale}>
        <body className={cn("min-h-screen bg-background font-sans antialiased", inter)}>{children}</body>
        <GoogleAnalytics gaId="G-8V781NCSR4" />
      </Providers>
    </html>
  );
}
