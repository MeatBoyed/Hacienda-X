"use client";
import { GenericPropertyResponse } from "@/app/api/[[...route]]/utils";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";

export default function SearchProperty() {
  // Hanldes all data fetching states, calls the Fetching Handler
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  const [filter, setFilter] = useState("");

  return (
    <div className="flexColCenter paddings innerWidth properties-container">
      <SearchBar filter={filter} setFilter={setFilter} />
      <div className="paddings flexCenter properties">
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
