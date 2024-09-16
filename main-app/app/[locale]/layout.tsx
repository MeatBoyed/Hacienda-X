import "./globals.css";
import type { Metadata, ResolvingMetadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers/Providers";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cn } from "@/lib/utils";
import { generateStaticMetaData, generateWebsiteConfig } from "@/config/siteConfig";
import { env } from "@/env";
import { getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

interface LocaleRootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function LocaleRootLayout({ children, params: { locale } }: Readonly<LocaleRootLayoutProps>) {
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
