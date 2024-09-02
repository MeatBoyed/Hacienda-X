"use client";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { PropertyCard } from "@/components/PropertyCard";
import { BookmarksContext, BookmarksContextType } from "@/lib/bookmarksContext";
import { useTranslations } from "next-intl";
import React, { useContext, useMemo } from "react";

export default function Bookmarks() {
  const t = useTranslations("Bookmarks");
  const { bookmarks } = useContext(BookmarksContext) as BookmarksContextType;

  const properties = useMemo(
    () =>
      bookmarks.length > 0 ? (
        bookmarks.map((property, index) => <PropertyCard property={property} key={index} />)
      ) : (
        <p>{t("emptyMessage")}</p>
      ),
    [bookmarks, t]
  );

  return (
    <div className="py-24 bg-white w-full flex justify-center items-center">
      <div className="flex justify-center items-start flex-col gap-10 px-4 lg:max-w-4xl w-full">
        <p className="scroll-m-20 text-2xl font-semibold tracking-tight">{t("heading")}</p>

        <div
          className={"grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full"}
        >
          {properties}
        </div>
      </div>
    </div>
  );
}
