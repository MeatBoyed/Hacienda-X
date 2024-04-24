// Implement Data fetching
"use client";

import React from "react";
import "swiper/css";
import "./Residencies.css";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import PropertiesCarousel from "@/components/PropertiesCarousel";

// Handles calling Fetch API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Residencies() {
  // Hanldes all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/api/residency/allresd",
    fetcher
  );

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center py-20">
  //       <p className="text-black text-lg">An error occured. Please Try again</p>
  //     </div>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <div className="wrapper flexCenter" style={{ height: "60vh" }}>
  //       <PuffLoader
  //         //   height={80}
  //         //   width="80"
  //         //   radius={1}
  //         color="#4066ff"
  //         aria-label="puff-loading"
  //       />
  //     </div>
  //   );
  // }

  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
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
        {data && <PropertiesCarousel data={data} />}
      </div>
    </div>
  );
}
