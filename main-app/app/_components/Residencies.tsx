"use client";

import React from "react";
import "swiper/css";
import "./Residencies.css";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PropertyCarousel from "@/components/PropertyCarousel";
import {
  GenericPropertyResponse,
  PropertyWithAddress,
} from "@/app/api/(utils)/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bath, BedDouble } from "lucide-react";
import { MdPool } from "react-icons/md";

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

        {error && !isLoading && (
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
        {/* <div className="w-full h-full"> */}
        <PropertyCarousel data={data?.results}>
          {data?.results.map((property, index) => (
            <Property key={index} property={property} />
          ))}
        </PropertyCarousel>
        {/* </div> */}
        {/* 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          <PropertyCarousel data={data?.results}>
            {data?.results.map((property) => (
              <Property />
            ))}
          </PropertyCarousel>
          {/* <Property />
          <Property />
          <Property /> */}
        {/* {data?.results.map((property) => (
          ))} */}
      </div>
    </section>
  );
}

function Property({ property }: { property: PropertyWithAddress }) {
  return (
    <Card className="border-0 md:min-w-fit min-w-max">
      <Link
        href={`/property-for-sale/${property.title}`}
        className="w-full h-full"
      >
        <div className="relative h-72 w-full overflow-hidden rounded-xl  hover:cursor-pointer">
          <Image
            src={property.images[0]} // Assuming you have an array of images
            alt={"yess"}
            width={320}
            height={400}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          />
          <p className="absolute top-0 right-0 mr-2 mt-2 rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
            {property.saleType}
          </p>
        </div>
        <CardContent className="px-1 flex flex-col gap-3 pt-4">
          <div className="flex gap-3 justify-start items-center overflow-hidden">
            <div className="flex justify-center items-center gap-2">
              <BedDouble size={20} />
              <p className="leading-7">{property.bedrooms}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Bath size={20} />
              <p className="leading-7">{property.bathrooms}</p>
            </div>
            {property.pool && (
              <div className="flex justify-center items-center gap-2">
                <MdPool size={20} />
                <p className="leading-7">{property.pool && "Yes"}</p>
              </div>
            )}
          </div>
          <p className="line-clamp-1 text-sm font-medium leading-none">
            {property.title}
          </p>
          <p className="text-lg font-semibold">
            R {property.price.toLocaleString()}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
