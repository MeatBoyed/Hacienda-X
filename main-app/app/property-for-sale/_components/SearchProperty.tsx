"use client";
import { GenericPropertyResponse } from "@/app/api/[[...route]]/utils";
import PropertyCard from "@/components/PropertyCard";
import {
  SearchBox,
  SearchBoxNonFunc,
  SearchBoxNonFuncSearchPage,
} from "@/components/SearchBar";
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
    <div className="w-full flex flex-col justify-center items-center gap-20 pb-32">
      <div className="px-5 w-full gap-3 flex justify-center items-center flex-col ">
        {/* <SearchBar filter={filter} setFilter={setFilter} /> */}
        {/* <SearchBox filter={filter} setFilter={setFilter} /> */}
        <SearchBoxNonFuncSearchPage
          mapActive={mapActive}
          setMapActive={setMapActive}
        />
        {mapActive && data && (
          <div className="w-full h-[75vh]" id="MapContainer">
            <MapViewer properties={data.results} />
          </div>
        )}
      </div>
      {/* Make the last item stick to the left side, not centered - FOR Daniel */}
      <div className="flex justify-center items-center px-3 gap-5 flex-wrap w-full md:items-start">
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
        {!mapActive &&
          data?.results
            ?.filter(
              (property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <div className="w-fit">
                <PropertyCard property={card} key={i} />
              </div>
            ))}
      </div>
    </div>
  );
}
