"use client";

import { sliderSettings } from "@/Utils/common";
import { Property } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import PropertyCard from "./PropertyCard";
import Residency from "@/Utils/Residency.json";

export default function PropertiesCarousel({
  data,
}: {
  data: Property[] | null;
}) {
  return (
    <Swiper {...sliderSettings}>
      <SlideNextButton />
      {/* slider */}
      {Residency?.slice(0, 8).map((property, i) => (
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
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
