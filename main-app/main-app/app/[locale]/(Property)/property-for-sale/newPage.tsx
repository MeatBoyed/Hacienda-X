"use client";

import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./Properties.css";
import { SearchBar } from "@/components/SearchBar";
import { PropertyCard } from "@/components/PropertyCard";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { GetPropertySearch } from "@/lib/RequestUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { MapComp } from "@/components/Map";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
import { PropertyServiceResponse } from "@/Server/lib/PropertyService";

export default function PropertiesSearch() {
  const t = useTranslations("Property.Index");
  const itemRef = useRef(null);
  const searchP = useSearchParams();

  const [itemWidth, setItemWidth] = useState(0);
  const [orderBy, setOrderBy] = useState("Default");

  const { data, isLoading, error } = useSWR<PropertyServiceResponse>(
    `/api/properties/search?${searchP.toString()}`,
    GetPropertySearch
  );

  useLayoutEffect(() => {
    if (itemRef.current) {
      setItemWidth(parseInt(window.getComputedStyle(itemRef.current).width));
    }
  });

  const orderProperties = useCallback(() => {
    switch (orderBy) {
      case "PriceH": // Descending (Highest first)
        return data?.properties?.sort((a, b) => {
          var key1 = a.price;
          var key2 = b.price;

          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      case "PriceL": // Ascending (Lowest first)
        return data?.properties?.sort((a, b) => {
          var key1 = a.price;
          var key2 = b.price;

          if (key1 < key2) {
            return -1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return 1;
          }
        });
      case "MostRecent": // Descending (Earliest first)
        return data?.properties?.sort((a, b) => {
          var key1 = a.updatedAt;
          var key2 = b.updatedAt;

          if (key1 < key2) {
            return 1;
          } else if (key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      case "Size": // Descending (Largest first)
        return data?.properties?.sort((a, b) => {
          var key1 = a.squareMeter;
          var key2 = b.squareMeter;

          if (key1 && key2 && key1 < key2) {
            return 1;
          } else if (key1 && key2 && key1 == key2) {
            return 0;
          } else {
            return -1;
          }
        });
      default:
        return data?.properties;
    }
  }, [orderBy, data]);

  const properties = useMemo(
    () =>
      data &&
      orderProperties()?.map((prop, i) => <PropertyCard className=" h-48 sm:h-60  md:h-52 lg:h-40" property={prop} key={i} />),
    [data, orderBy]
  );

  return (
    <div className="bg-white" ref={itemRef}>
      <div className="md:mt-10 lg:mt-0 mb-2 lg:min-h-screen lg:max-h-screen">
        <div className="flex justify-center flex-col  w-full h-full ">
          <div className="flex justify-center sm:flex-row flex-col items-start border gap-3 lg:min-h-screen lg:h-screen rounded-md shadow-md bg-background">
            <div className="w-full  pt-[4.8rem] lg:max-h-screen lg:min-h-screen flex justify-start items-center flex-col gap-2">
              {itemWidth < 1024 && <SearchBar classname="px-4" />}

              {itemWidth >= 1024 && (
                <ResizablePanelGroup
                  direction="horizontal"
                  className="max-h-[95vh] min-h-[95vh] w-full rounded-lg border overflow-y-auto scroll-smooth"
                >
                  <ResizablePanel
                    minSize={38}
                    maxSize={65}
                    defaultSize={45}
                    style={{ overflowY: "auto" }}
                    className="overflow-y-auto max-h-screen scroll-smooth space-y-4 pt-1 px-4"
                  >
                    <div className="w-full grid items-center gap-2">
                      <SearchBar classname="" />
                      <Select value={orderBy} onValueChange={(value) => setOrderBy(value)}>
                        <SelectTrigger className="w-full md:w-fit">
                          <SelectValue placeholder={t("orderBy.title")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>{t("orderBy.title")}</SelectLabel>
                            <SelectItem value="Default">{t("orderBy.options.default")}</SelectItem>
                            <SelectItem value="PriceL">{t("orderBy.options.priceLow")}</SelectItem>
                            <SelectItem value="PriceH">{t("orderBy.options.priceHigh")}</SelectItem>
                            <SelectItem value="MostRecent">{t("orderBy.options.mostRecent")}</SelectItem>
                            <SelectItem value="Size">{t("orderBy.options.size")}</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {isLoading && (
                      <div className="w-full flex justify-center items-center h-[50vh]">
                        <PuffLoader color="blue" />
                      </div>
                    )}

                    {!isLoading && !error && data && data.properties.length === 0 && (
                      <div className="flex flex-col justify-center items-center gap-1 mb-5">
                        <p className="text-lg font-semibold ">{t("orderBy.error.heading")}</p>
                        <p className="text-base font-normal ">{t("orderBy.error.subHeading")}</p>
                      </div>
                    )}
                    <div className=" py-2 px-2 grid grid-cols-1 w-full sm:gap-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-5">
                      {properties}
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel minSize={35} maxSize={62} defaultSize={55}>
                    {data && !isLoading && !error && (
                      <MapComp height={"100%"} properties={data.properties} focusedProperty={data.properties[0]} />
                    )}
                  </ResizablePanel>
                </ResizablePanelGroup>
              )}

              {itemWidth < 1024 && (
                <div className="w-full flex flex-col justify-center items-center gap-5 px-4">
                  <div className="w-full">
                    <Select value={orderBy} onValueChange={(value) => setOrderBy(value)}>
                      <SelectTrigger className="w-full md:w-fit">
                        <SelectValue placeholder={t("orderBy.title")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t("orderBy.title")}</SelectLabel>
                          <SelectItem value="Default">{t("orderBy.options.default")}</SelectItem>
                          <SelectItem value="PriceL">{t("orderBy.options.priceLow")}</SelectItem>
                          <SelectItem value="PriceH">{t("orderBy.options.priceHigh")}</SelectItem>
                          <SelectItem value="MostRecent">{t("orderBy.options.mostRecent")}</SelectItem>
                          <SelectItem value="Size">{t("orderBy.options.size")}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  {isLoading && (
                    <div className="w-full flex justify-center items-center h-[50vh]">
                      <PuffLoader color="blue" />
                    </div>
                  )}

                  {!isLoading && !error && data && data.total === 0 && (
                    <div className="flex flex-col justify-center items-center gap-1 mb-5">
                      <p className="text-lg font-semibold ">{t("orderBy.error.heading")}</p>
                      <p className="text-base font-normal ">{t("orderBy.error.subHeading")}</p>
                    </div>
                  )}
                  <div className=" py-2 px-2 grid grid-cols-1 w-full sm:gap-10 md:grid-cols-2 md:gap-5 lg:grid-cols-2 lg:gap-5">
                    {properties}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
