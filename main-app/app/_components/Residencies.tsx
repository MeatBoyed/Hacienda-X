"use client";

import React from "react";
import "swiper/css";
import "./Residencies.css";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "@/components/PropertyCarousel";
import { GenericPropertyResponse } from "@/app/api/(utils)/utils";

// Handles calling Fetch API (This is an example, it has been extracted into the Utils file)
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Residencies() {
  // Handles all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  return (
    <section id="residencies" className="my-12 w-full">
      <div className="px-4 sm:px-0 sm:max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-lg font-semibold opacity-80 text-accent">
              Featured Properties
            </p>
            <h2 className="text-3xl font-semibold tracking-tight pb-2">
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

        {error && (
          <div className="flex justify-center items-center py-20">
            <p className="text-black text-lg">
              An error occurred. Please try again.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-5">
            <div className="wrapper flexCenter" style={{ height: "20vh" }}>
              <PuffLoader color="#4066ff" aria-label="puff-loading" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {data?.results.map((property) => (
            <div key={property.title} className="relative">
              <div className="rounded-lg bg-white p-4 shadow">
                <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
                  <img
                    src={property.images[0]} // Assuming you have an array of images
                    alt={`${property.title} - thumbnail`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500 transform hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-0 left-5 mb-3 flex">
                  <p className="flex items-center font-medium text-white shadow-sm">
                    <i className="fa fa-camera mr-2 text-xl text-white"></i>
                    {property.images.length}
                  </p>
                </div>
                <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
                  {" "}
                  Residential{" "}
                </span>
                <div className="mt-4">
                  <h2
                    className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
                    title={property.title}
                  >
                    {property.title}
                  </h2>
                  <p className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                    <span className="text-sm uppercase"> USD </span>
                    <span className="text-2xl">
                      {property.price?.toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <p className="line-clamp-2 mt-2 text-lg text-gray-800">
                    {property.description}
                  </p>
                </div>
                <div className="justify-center">
                  <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
                    <p className="flex items-center font-medium text-gray-800">
                      <i className="fa fa-bed mr-2 text-blue-900"></i>
                      {property.bedrooms}
                    </p>
                    <p className="flex items-center font-medium text-gray-800">
                      <i className="fa fa-bath mr-2 text-blue-900"></i>
                      {property.bathrooms}
                    </p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="h-6 w-6 rounded-full bg-gray-200 md:h-8 md:w-8"></div>
                      <span className="bg-primary-red absolute top-0 right-0 inline-block h-3 w-3 rounded-full"></span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button>
                      <i className="fa fa-sms mx-1 rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i>
                    </button>
                    <button>
                      <i className="fa fa-phone rounded-md bg-[#0174E1] py-1 px-3 text-2xl text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
