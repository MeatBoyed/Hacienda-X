"use client";
import { GenericPropertyResponse } from "@/app/api/(utils)/utils";
import { MapComp } from "@/components/Map";
import PropertyCard from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { fetcher } from "@/lib/utils";
import { useMemo, useState } from "react";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";

export default function SearchProperty() {
  // Hanldes all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  const [filter, setFilter] = useState("");
  const [mapActive, setMapActive] = useState<boolean>(true);

  const properties = useMemo(
    () =>
      data?.results.map((prop, i) => (
        <PropertyCard property={prop} key={i} max />
      )),
    [data]
  );

  return (
    <div className="flex justify-between flex-col lg:p-3 gap-3 w-full h-screen mb-10">
      <div className="flex justify-center sm:flex-row flex-col items-start border gap-3 h-screen rounded-md shadow-lg bg-background">
        {isLoading && (
          <div className="w-full flex justify-center items-center h-[50vh]">
            <PuffLoader color="blue" />
          </div>
        )}
        {!isLoading && data && (
          <>
            <div className="flex justify-start items-center gap-5 flex-col w-full p-4 overflow-y-auto max-h-screen scroll-smooth">
              <SearchBar
                mapActive={mapActive}
                setMapActive={setMapActive}
                filter={filter}
                setFilter={setFilter}
                classname=""
              />

              <div className="h-screen flex justify-start items-start flex-wrap gap-10 md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-2 lg:gap-12">
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
