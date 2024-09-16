"use client";

import PropertyCard from "@/components/main/PropertyCard";
import { generateWebsiteConfig } from "@/config/siteConfig";
import { useBookmarkService } from "@/lib/Hooks/useBookmarkService";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { useMemo } from "react";

// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
//   const t = await getTranslations("WebsiteConfig.bookmarks");
//   return await generateWebsiteConfig(t);
// }

export default function BookmarksPage() {
  const { bookmarks } = useBookmarkService();
  const properties = useMemo(
    () => bookmarks.map((property) => <PropertyCard key={property.property_id} property={property} />),
    [bookmarks]
  );
  const t = useTranslations("Bookmarks");
  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("heading")}</h1>
        <p className="text-muted-foreground">
          {t("subHeading")} {bookmarks.length} {t("subHeadingEnd")}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{properties}</div>
    </div>
  );
}
