"use client";
import { GenericPropertyResponse } from "@/app/api/[[...route]]/utils";
import PropertyCard from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { fetcher } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
// import { MapComp } from "@/components/Map";

export default function SearchProperty() {
  // Hanldes all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  const [filter, setFilter] = useState("");
  const [mapActive, setMapActive] = useState<boolean>(false);

  return (
    // Add padding for desktop & tablet devices
    <div className="w-full flex flex-col justify-center items-center gap-20 ">
      <div className="w-full gap-3 flex justify-center items-center flex-col px-4 md:px-0 mt-5 sm:max-w-2xl lg:max-w-5xl">
        <SearchBar
          mapActive={mapActive}
          setMapActive={setMapActive}
          filter={filter}
          setFilter={setFilter}
        />
        {/* {mapActive && data && (
          // <MapViewer
          //   classname="h-[50vh] md:h-[75vh]"
          //   properties={data.results}
          // />
          // <MapComp
          //   focusedProperty={data.results[0]}
          //   properties={data.results}
          // />
        )} */}
      </div>
      {/* Make the last item stick to the left side, not centered - FOR Daniel */}
      <div className="flex justify-center items-center w-full">
        {isLoading && (
          <div className="wrapper flexCenter" style={{ height: "60vh" }}>
            <PuffLoader color="#4066ff" aria-label="puff-loading" />
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center py-20">
            <p className="text-black text-lg">
              An error occured. Please Try again
            </p>
          </div>
        )}
        {!mapActive && (
          <div className="grid w-full grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-3 md:grid-cols-2 px-4 sm:max-w-2xl lg:max-w-5xl">
            {/* {data?.results
              ?.filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <div className="w-fit" key={i}>
                  <PropertyCard property={card} />
                </div>
              ))} */}
          </div>
        )}
      </div>
    </div>
  );
}