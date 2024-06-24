import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { GenericPropertyResponse } from "@/app/api/(utils)/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Residencies() {
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  return (
    <section className="my-12 w-full flex flex-col items-center gap-10">
      <div className="flex justify-between items-center w-full px-4 sm:px-0 sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold opacity-80 text-accent">
            Featured Properties
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Popular Residencies
          </h2>
        </div>
        <Button className="hidden md:block bg-accent hover:bg-primary hover:border hover:border-accent hover:text-foreground">
          <Link href="/property-for-sale">See more</Link>
        </Button>
      </div>

      <div className="w-full px-4 sm:px-0 sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
        {error && (
          <div className="flex justify-center items-center w-full py-20">
            <p className="text-lg text-black">
              An error occurred. Please Try again
            </p>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center w-full py-5">
            <PuffLoader color="#4066ff" aria-label="puff-loading" />
          </div>
        )}
        {data && <PropertyCarousel data={data.results} />}
      </div>
    </section>
  );
}

function PropertyCarousel({ data }) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {data.map((property) => (
        <SwiperSlide key={property.id}>
          <div className="group flex flex-col rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-600">{property.location}</p>
              <p className="text-sm text-gray-600">{property.price}</p>
              <p className="text-sm text-gray-600">{property.details}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
