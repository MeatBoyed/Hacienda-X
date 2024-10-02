import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HowItWorks() {
  const t = useTranslations("Index.HowItWorks");
  return (
    <section className="pt-14 gap-5 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
      <article className="rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105 w-11/12 md:w-full mx-auto">
        <div className="article-wrapper p-4">
          <figure className="mb-4">
            <img
              src="../ctapic1.jpg"
              alt=""
              className="w-full h-24 md:h-auto object-cover rounded-md"
            />
          </figure>
          <div className="article-body text-center">
            <h2 className="text-xl md:text-lg font-bold mb-2 md:mb-4">
              {t("sellPropertyCard.heading")}
            </h2>
            <p className="mb-4 text-sm md:text-xs">
              {t("sellPropertyCard.content")}
            </p>

            <Link
              href="/pricing"
              className="
             read-more inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-xs
            "
            >
              {t("sellPropertyCard.button")}
            </Link>
          </div>
        </div>
      </article>
      <article className="rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105 w-11/12 md:w-full mx-auto">
        <div className="article-wrapper p-4">
          <figure className="mb-4">
            <img
              src="../ctapic2.jpg"
              alt=""
              className="w-full h-24 md:h-auto object-cover rounded-md"
            />
          </figure>
          <div className="article-body text-center">
            <h2 className="text-xl md:text-lg font-bold mb-2 md:mb-4">
              {t("buyPropertyCard.heading")}
            </h2>
            <p className="mb-4 text-sm md:text-xs">
              {t("buyPropertyCard.content")}
            </p>

            <Link
              href="/property-for-sale"
              className="
            read-more inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-xs
            "
            >
              {t("buyPropertyCard.button")}
            </Link>
          </div>
        </div>
      </article>
      <article className="rounded-lg shadow-lg bg-white transform transition-transform hover:scale-105 w-11/12 md:w-full mx-auto">
        <div className="article-wrapper p-4">
          <figure className="mb-4">
            <img
              src="../ctapic5.jpg"
              alt=""
              className="w-full h-24 md:h-auto object-cover rounded-md"
            />
          </figure>
          <div className="article-body text-center">
            <h2 className="text-xl md:text-lg font-bold mb-2 md:mb-4">
              {t("discoverCard.heading")}
            </h2>
            <p className="mb-4 text-sm md:text-xs">
              {t("discoverCard.content")}
            </p>
            <Link
              href="/aboutus"
              className="
            read-more inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-xs
            "
            >
              {t("discoverCard.button")}
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
