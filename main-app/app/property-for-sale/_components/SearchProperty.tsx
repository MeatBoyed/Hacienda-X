"use client";
import { GenericPropertyResponse } from "@/app/api/[[...route]]/utils";
import PropertyCard from "@/components/PropertyCard";
import { SearchBar } from "@/components/SearchBar";
import { fetcher } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { MapViewer } from "@/components/Map";

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
      <div className="w-full gap-3 flex justify-center items-center flex-col px-4 pt-5 sm:max-w-2xl sm:px-2 sm:pt-0 lg:max-w-4xl">
        {/* <SearchBar filter={filter} setFilter={setFilter} /> */}
        {/* <SearchBox filter={filter} setFilter={setFilter} /> */}
        <SearchBar
          mapActive={mapActive}
          setMapActive={setMapActive}
          filter={filter}
          setFilter={setFilter}
        />
        {mapActive && data && (
          <div className="w-full h-[75vh]" id="MapContainer">
            <MapViewer properties={data.results} />
          </div>
        )}
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
            {data?.results
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
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
