"use client";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import React, { ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/components/ImagesInput/FileInputUtils";

export default function PropertyCarousel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
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
      className={cn(
        "w-full sm:max-w-full flex justify-center items-center",
        className
      )}
    >
      <CarouselContent className="w-full gap-5 ml-4">
        {children}
      </CarouselContent>
      <CarouselPrevious size={"sm"} />
      <CarouselNext size={"sm"} />
    </Carousel>
  );
}
