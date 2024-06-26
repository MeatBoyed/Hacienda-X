"use client";
import {
  GenericPropertyResponse,
  PropertyWithAddress,
} from "@/app/api/(utils)/utils";
import { MapComp } from "@/components/Map";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";

export default function SearchProperty() {
  const searchParams = useSearchParams();

  // Hanldes all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  function filterProperties(data: PropertyWithAddress[]) {
    let filteredProperty: PropertyWithAddress[] = data;
    const bedrooms = parseInt(searchParams.get("bedrooms") || "0");
    const bathrooms = parseInt(searchParams.get("bathrooms") || "0");
    const price = parseInt(searchParams.get("price") || "0");

    if (bedrooms > 0) {
      filteredProperty = filteredProperty.filter(
        (prop) => prop.bedrooms === bedrooms
      );
    }
    if (bathrooms > 0) {
      filteredProperty = filteredProperty.filter(
        (prop) => prop.bathrooms === bathrooms
      );
    }
    return filteredProperty;
  }

  const filterCallback = useCallback(filterProperties, [searchParams]);

  const properties = useMemo(
    () =>
      data &&
      filterCallback(data.results).map((prop, i) => (
        <PropertyCard
          className=" h-48 sm:h-60  md:h-52 lg:h-40"
          property={prop}
          key={i}
        />
      )),
    [data]
  );

  return (
    <div className="flex justify-between flex-col gap-3 w-full h-screen mb-10">
      <div className="flex justify-center sm:flex-row flex-col items-start border gap-3 h-screen rounded-md shadow-lg bg-background">
        {isLoading && (
          <div className="w-full flex justify-center items-center h-[50vh]">
            <PuffLoader color="blue" />
          </div>
        )}
        {!isLoading && data && (
          <>
            <div className="pt-14 lg:pt-4 flex justify-start items-center gap-5 flex-col w-full p-4 overflow-y-auto max-h-screen scroll-smooth">
              <SearchBar classname="" />

              <div className="h-screen grid grid-cols-1 w-full sm:gap-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-5">
                {properties}
              </div>
            </div>

            <div className="hidden lg:block w-[130vw] min-h-screen">
              {data && (
                <MapComp
                  height={"55vw"}
                  properties={data.results}
                  focusedProperty={data.results[0]}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
