"use client";
import { GenericPropertyResponse } from "@/app/api/[[...route]]/utils";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
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

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 pb-32">
      <div className="w-full h-full " id="MapContainer">
        {data && <MapViewer properties={data.results} />}
      </div>
      <div className="px-5">
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>
      {/* Make the last item stick to the left side, not centered - FOR Daniel */}
      <div className="flex justify-center items-center px-3 gap-3 flex-wrap w-full md:items-start">
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
        {data?.results
          ?.filter(
            (property) =>
              property.title.toLowerCase().includes(filter.toLowerCase()) ||
              property.city.toLowerCase().includes(filter.toLowerCase()) ||
              property.country.toLowerCase().includes(filter.toLowerCase())
          )
          .map((card, i) => (
            <PropertyCard property={card} key={i} />
          ))}
      </div>
    </div>
  );
}
