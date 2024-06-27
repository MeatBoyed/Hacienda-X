"use client";

import { GenericPropertyResponse } from "@/app/api/(utils)/utils";
import { MapComp } from "@/components/Map";
import { SearchBar } from "@/components/SearchBar";
import { fetcher } from "@/lib/utils";
import PuffLoader from "react-spinners/PuffLoader";
import useSWR from "swr";

export default function MapSearchView() {
  const { data, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties",
    fetcher
  );

  return (
    <div className="flex justify-between flex-col gap-3 w-full min-h-screen mt-24 lg:mt-16 bg-white mb-10">
      {isLoading && (
        <div className="w-full flex justify-center items-center h-[50vh]">
          <PuffLoader color="blue" />
        </div>
      )}
      <SearchBar classname="hidden md:flex w-full pt-5" mapView />
      {!isLoading && data && (
        <div className=" w-[100vw] min-h-screen">
          {data && (
            <MapComp
              height={"100vh"}
              properties={data.results}
              focusedProperty={data.results[0]}
            />
          )}
        </div>
      )}
    </div>
  );
}
