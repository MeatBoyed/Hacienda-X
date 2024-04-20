"use client";

import { sliderSettings } from "@/Utils/common";
import { Property } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import PropertyCard from "./PropertyCard";

export default function PropertiesCarousel({ data }: { data: Property[] }) {
  return (
    <Swiper {...sliderSettings}>
      <SlideNextButton />
      {/* slider */}
      {data?.slice(0, 8).map((card, i) => (
        <SwiperSlide key={i}>
          <PropertyCard card={card} />
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
