"use client";

import PropertyCard from "@/components/main/PropertyCard";
import { useBookmarkService } from "@/lib/services/BookmarkService";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarkService();
  const properties = useMemo(
    () =>
      bookmarks.map((property) => <PropertyCard key={property.property_id} property={property} />),
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
