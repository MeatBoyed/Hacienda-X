import React, { PropsWithChildren } from "react";
import "swiper/css";
import "./Residencies.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "@/components/PropertyCarousel";
import { PropertyCard } from "@/components/PropertyCard";
import { cn } from "@/components/UploadShad/FileInputUtils";

import { getTranslations } from "next-intl/server";
import { getProperties } from "@/lib/RequestService";

type ResidenciesProps = PropsWithChildren & {
  className?: string;
  margin?: string;
};

type ResidenciesHeadProps = PropsWithChildren & {
  heading: string;
  subHeading: string;
  className?: string;
};

export default async function Residencies({ className, margin, children }: ResidenciesProps) {
  const dict = await getTranslations();
  const data = await getProperties();

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center py-20 gap-5">
        <h1>{dict("Index.Residencies.error")}</h1>
      </div>
    );
  }

  return (
    <section id="residencies" className={cn("my-12 w-full", margin)}>
      <div className={cn("px-4 flex justify-center items-center flex-col w-full gap-5 sm:px-5 xl:px-32 ", className)}>
        {children}
        <PropertyCarousel className="">
          {data && data.map((property, index) => <PropertyCard key={index} property={property} />)}
        </PropertyCarousel>
      </div>
    </section>
  );
}

Residencies.Head = async function ResidenciesHead({ subHeading, heading, className }: ResidenciesHeadProps) {
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
