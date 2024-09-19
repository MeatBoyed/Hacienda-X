import React, { PropsWithChildren, Suspense } from "react";
import "swiper/css";
import "./Residencies.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "@/components/main/PropertyCarousel";
import { cn } from "@/lib/utils";

import { getTranslations } from "next-intl/server";
import { GetRequestService } from "@/lib/services/GetRequestService";
import { ErrorView } from "@/components/main/Views/Views";
import Loader from "@/components/ui/loader";

type ResidenciesProps = PropsWithChildren & {
  margin?: string;
  searchQuery?: URLSearchParams;
  className?: string;
};

type ResidenciesHeadProps = PropsWithChildren & {
  heading: string;
  subHeading: string;
  className?: string;
};

export default async function Residencies({
  searchQuery,
  className,
  margin,
  children,
}: ResidenciesProps) {
  let response;
  if (!searchQuery) {
    response = await GetRequestService.getProperties();
  } else {
    response = await GetRequestService.getSearchProperties(searchQuery);
  }

  return (
    <section id="residencies" className={cn("my-12 w-full", margin)}>
      <div
        className={cn(
          "px-3 flex justify-center items-center flex-col w-full gap-5 sm:px-5 xl:px-32 ",
          className
        )}
      >
        {children}
        {!response && (
          // <div className="flex flex-col justify-center items-center py-20 gap-5">
          //   <h1>{dict("Index.Residencies.error")}</h1>
          // </div>
          <ErrorView />
        )}
        <Suspense fallback={<Loader className="max-h-24 mt-10" />}>
          {response && <PropertyCarousel properties={response.properties} />}
        </Suspense>
      </div>
    </section>
  );
}

Residencies.Head = async function ResidenciesHead({
  subHeading,
  heading,
  className,
}: ResidenciesHeadProps) {
  const dict = await getTranslations();
  return (
    <div className={cn("flex justify-between items-center w-full", className)}>
      <div className="flex flex-col">
        <p className="text-lg font-semibold opacity-80 text-accent">{subHeading}</p>
        <h2 className="text-3xl font-semibold tracking-tight pb-2">{heading}</h2>
      </div>
      <Button
        variant={"default"}
        className="bg-accent hover:bg-primary hover:border hover:border-accent hover:text-foreground hidden md:block"
      >
        <Link href="/property-for-sale">{dict("Index.Residencies.button")}</Link>
      </Button>
    </div>
  );
};
