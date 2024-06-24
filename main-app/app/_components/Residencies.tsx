// Implement Data fetching
"use client";

import React from "react";
import "swiper/css";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { GenericPropertyResponse } from "@/app/api/(utils)/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "@/components/PropertyCarousel";

// Handles calling Fetch API (This is an example, it has been extracted into the Utils file)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Residencies() {
  // Hanldes all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  return (
    <section
      id="residencies"
      className="my-12 w-full flex justify-center items-center flex-col gap-10"
    >
      <div className="flex justify-between items-center w-full px-4 sm:px-0 sm:max-3xl lg:max-w-5xl xl:max-w-6xl">
        <div className="flex justify-center items-start flex-col gap-1">
          <p className="text-lg font-semibold opacity-80 text-accent">
            Featured Properties
          </p>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Popular Residencies
          </h2>
        </div>

        <Button
          variant={"default"}
          className="bg-accent hover:bg-primary hover:border hover:border-accent hover:text-foreground hidden md:block"
        >
          <Link href="/property-for-sale">See more</Link>
        </Button>
      </div>
      <div className="flex justify-center items-start flex-col w-full  px-4 sm:px-0 sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
        {error && (
          <div className="flex justify-center items-center w-full py-20">
            <p className="text-black text-lg">
              An error occurred. Please Try again
            </p>
          </div>
        )}
        {isLoading && (
          <div className="flex justify-center items-center w-full py-5">
            <div className="wrapper flexCenter" style={{ height: "20vh" }}>
              <PuffLoader
                //   height={80}
                //   width="80"
                //   radius={1}
                color="#4066ff"
                aria-label="puff-loading"
              />
            </div>
          </div>
        )}
        <div className="w-full h-full ">
          {/* {data && <PropertiesCarousel data={data.results} />} */}
          {data && <PropertyCarousel data={data.results} />}
        </div>
      </div>
    </section>
  );
}
