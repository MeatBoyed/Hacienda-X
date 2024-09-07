"use client";
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
} from "@/components/core/carousel";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { useMemo } from "react";
import PropertyCard from "./PropertyCard";

export default function PropertyCarousel({
  properties: defaultProperties,
}: {
  properties: PropertyWithAddress[];
}) {
  const properties = useMemo(() => {
    return defaultProperties.map((property, index) => {
      return (
        <CarouselItem key={index} className="basis-1/3 pl-4">
          <PropertyCard property={property} className="min-h-fit" />
        </CarouselItem>
      );
    });
  }, [defaultProperties]);

  return (
    <div className="relative w-full px-4">
      <Carousel>
        <CarouselContent className="-ml-4 items-start">{properties}</CarouselContent>
        <CarouselNavigation
          className="absolute -bottom-14 left-auto top-auto w-full justify-end gap-2"
          classNameButton="bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800"
          alwaysShow
        />
      </Carousel>
    </div>
  );
}