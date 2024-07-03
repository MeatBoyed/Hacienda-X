"use client";

import React, { useMemo, useState } from "react";
import "./Properties.css";
import { SearchQueryParameterSchema } from "@/app/_components/SearchFilters";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { GetPropertySearch } from "@/lib/RequestUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";

export default function PropertiesSearch() {
  const searchP = useSearchParams();

  const { data, isLoading, error } = useSWR<PropertyWithAddress[]>(
    `/api/properties/search?${searchP.toString()}`,
    GetPropertySearch
  );

  const properties = useMemo(
    () =>
      data &&
      data.map((prop, i) => (
        <PropertyCard
          className=" h-48 sm:h-60  md:h-52 lg:h-40"
          property={prop}
          key={i}
        />
      )),
    [data]
  );

  return (
    <div className="bg-white">
      <div className="mt-20 max-h-screen">
        <div className="flex justify-between flex-col  w-full h-full ">
          <div className="flex justify-center sm:flex-row flex-col items-start border gap-3 h-screen rounded-md shadow-md bg-background">
            <div className="w-full flex justify-center items-center flex-col gap-2">
              <SearchBar classname="" />
              <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[95vh] w-full rounded-lg border overflow-y-auto scroll-smooth"
              >
                <ResizablePanel
                  minSize={38}
                  maxSize={65}
                  defaultSize={45}
                  className="overflow-y-auto scroll-smooth"
                >
                  {isLoading && (
                    <div className="w-full flex justify-center items-center h-[50vh]">
                      <PuffLoader color="blue" />
                    </div>
                  )}

                  {!isLoading && !error && data && data.length === 0 && (
                    <div className="flex flex-col justify-center items-center gap-1 mb-5">
                      <p className="text-lg font-semibold ">
                        Oh no, it looks like no properties match you query.
                      </p>
                      <p className="text-base font-normal ">
                        Checkout our other properties
                      </p>
                    </div>
                  )}
                  <div className=" py-2 px-2 grid grid-cols-1 w-full sm:gap-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-5">
                    {properties}
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={35} maxSize={62} defaultSize={55}>
                  {/* {data && !isLoading && !error && (
                  <MapComp
                    height={"100%"}
                    properties={filterProperties(data.results)}
                    focusedProperty={filterProperties(data.results)[0]}
                  />
                )} */}
                </ResizablePanel>
              </ResizablePanelGroup>
              {/* 
            <div className="hidden lg:block w-[130vw] min-h-screen">
              {data && (
                <MapComp
                  height={"55vw"}
                  properties={filterProperties(data.results)}
                  focusedProperty={filterProperties(data.results)[0]}
                />
              )}
            </div> */}
            </div>
            {/* {!isLoading && data && (
          <>
            <div className="pt-14 lg:pt-4 flex justify-start items-center gap-10 flex-col w-full p-4 overflow-y-auto max-h-screen scroll-smooth">
              <SearchBar classname="" />

              <div className="h-screen grid grid-cols-1 w-full sm:gap-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-5">
                {properties}
              </div>
            </div>

            <div className="hidden lg:block w-[130vw] min-h-screen">
              {data && (
                <MapComp
                  height={"55vw"}
                  properties={filterProperties(data.results)}
                  focusedProperty={filterProperties(data.results)[0]}
                />
              )}
            </div>
          </>
        )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
