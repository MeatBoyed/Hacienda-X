"use client";

import { sliderSettings } from "@/Utils/common";
import { Property } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import PropertyCard from "./PropertyCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

export default function PropertiesCarousel({
  data,
}: {
  data: Property[] | null;
}) {
  return (
    <Swiper className="" {...sliderSettings}>
      <div className="mt-10">
        <SlideNextButton />
      </div>
      {/* slider */}
      {data?.slice(0, 8).map((property, i) => (
        <SwiperSlide key={i}>
          <PropertyCard property={property} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flex justify-center items-center w-full gap-5">
      <Button variant="outline" size="icon" onClick={() => swiper.slidePrev()}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => swiper.slideNext()}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function PropertyCarousel2({ data }: { data: Property[] | null }) {
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
      <CarouselContent className="w-full gap-5 -ml-4">
        {/* {Array.from({ length: 5 }).map((_, index) => ( */}
        {/* {data?.slice(0, 8).map((property, index) => ( */}
        {data?.map((property, index) => (
          <div className="pl-4 w-full h-full" key={index}>
            <PropertyCard property={property} />
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious size={"sm"} />
      <CarouselNext size={"sm"} />
    </Carousel>
  );
}
