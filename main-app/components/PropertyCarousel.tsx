"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import React, { ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import { PropertyWithAddress } from "@/app/api/(utils)/utils";

export default function PropertyCarousel({
  data,
  children,
}: {
  children: ReactNode;
  data?: PropertyWithAddress[] | null;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full sm:max-w-full flex justify-center items-center"
    >
      <CarouselContent className="w-full gap-5 ml-4">
        {/* {Array.from({ length: 5 }).map((_, index) => ( */}
        {/* {data?.slice(0, 8).map((property, index) => ( */}
        {/* {data?.map((property, index) => ( */}
        {/* <div className="pl-4 w-full h-full" key={index}> */}
        {/* <Propertyard property={property} /> */}
        {/* </div> */}
        {/* ))} */}
        {children}
      </CarouselContent>
      <CarouselPrevious size={"sm"} />
      <CarouselNext size={"sm"} />
    </Carousel>
  );
}
