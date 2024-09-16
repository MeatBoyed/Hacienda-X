import { Suspense } from "react";
import type { Metadata } from "next";
import "mapbox-gl/dist/mapbox-gl.css";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Loader from "@/components/ui/loader";
import { generateWebsiteConfig } from "@/config/siteConfig";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations("WebsiteConfig.home");
  return await generateWebsiteConfig(t);
}

export default function CoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ background: "bg-white", overflow: "hidden" }}>
      <Suspense fallback={<Loader />}>
        <Header />
        {children}
        <Footer />
      </Suspense>
    </div>
  );
}
