"use client";
import useSWR from "swr";
import { GetUsersProperty } from "@/lib/RequestUtils";
import { GenericPropertyResponse } from "@/app/api/(utils)/utils";
import PropertyInsightCard, {
  PropertyInsightCardSkeleton,
} from "../../_components/PropertyInsightCard";
import { useMemo } from "react";

export default function Properties() {
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties/dashboard/property",
    GetUsersProperty
  );

  const properties = useMemo(
    () =>
      data &&
      data.results.map((property, index) => (
        <PropertyInsightCard property={property} key={index} />
      )),
    [data]
  );

  console.log("User's Properties: ", data);

  return (
    <>
      {isLoading && <PropertiesSkeleton />}
      {!isLoading && (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {properties}
        </div>
      )}
    </>
  );
}

export function PropertiesSkeleton() {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
      <PropertyInsightCardSkeleton />
      <PropertyInsightCardSkeleton />
      <PropertyInsightCardSkeleton />
      <PropertyInsightCardSkeleton />
      <PropertyInsightCardSkeleton />
      <PropertyInsightCardSkeleton />
      <PropertyInsightCardSkeleton />
    </div>
  );
}
