// Implement Data fetching
"use client";

import React from "react";
import "swiper/css";
import "./Residencies.css";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import PropertiesCarousel from "@/components/PropertiesCarousel";
import { GenericPropertyResponse } from "../api/[[...route]]/utils";

// Handles calling Fetch API (This is an example, it has been extracted into the Utils file)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Residencies() {
  // Hanldes all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flex justify-center items-start flex-col gap-1">
          <p className="text-lg font-semibold opacity-80">Best Choices</p>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Popular Residencies
          </h2>
        </div>
        {isLoading && (
          <div className="wrapper flexCenter" style={{ height: "60vh" }}>
            <PuffLoader
              //   height={80}
              //   width="80"
              //   radius={1}
              color="#4066ff"
              aria-label="puff-loading"
            />
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center py-20">
            <p className="text-black text-lg">
              An error occured. Please Try again
            </p>
          </div>
        )}
        <div className="w-full h-full mt-10">
          {data && <PropertiesCarousel data={data.results} />}
        </div>
      </div>
    </div>
  );
}
