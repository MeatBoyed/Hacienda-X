import React, { PropsWithChildren } from "react";
import "swiper/css";
import "./Residencies.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "@/components/main/PropertyCarousel";
import { cn } from "@/lib/utils";

import { getTranslations } from "next-intl/server";
import { GetRequestService } from "@/lib/services/GetRequestService";

type RentalPropertiesProps = PropsWithChildren & {
  className?: string;
  margin?: string;
};

type RentalPropertiesHeadProps = PropsWithChildren & {
  heading: string;
  subHeading: string;
  className?: string;
};

export default async function RentalProperties({ className, margin, children }: RentalPropertiesProps) {
  const dict = await getTranslations();
  const data = await GetRequestService.getProperties();
  // Filter properties to only include rentals
  const rentalProperties = data && Array.isArray(data.properties)
    ? data.properties.filter((property: { saleType: string }) => property.saleType === 'Rent')
    : [];

  return (
    <section id="rental-properties" className={cn("my-12 w-full", margin)}>
      <div
        className={cn(
          "px-4 flex justify-center items-center flex-col w-full gap-5 sm:px-5 xl:px-32 ",
          className
        )}
      >
        {children}
        {!data && (
          <div className="flex flex-col justify-center items-center py-20 gap-5">
            <h1>{dict("Index.RentalProperties.error")}</h1>
          </div>
        )}
        {rentalProperties.length > 0 && <PropertyCarousel properties={rentalProperties} />}
      </div>
    </section>
  );
}

RentalProperties.Head = async function RentalPropertiesHead({
  subHeading,
  heading,
  className,
}: RentalPropertiesHeadProps) {
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
        <Link href="/property-for-rent">{dict("Index.RentalProperties.button")}</Link>
      </Button>
    </div>
  );
};