"use client";

import useSWR from "swr";
import { GetUsersProperty } from "@/lib/RequestUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import PropertyInsightCard, {
  PropertyInsightCardSkeleton,
} from "../../_components/PropertyInsightCard";
import { useMemo } from "react";
import { cn } from "@/components/ImagesInput/FileInputUtils";

export default function Properties({ className }: { className?: string }) {
  const { data, error, isLoading } = useSWR<PropertyWithAddress[]>(
    "/api/dashboard/property",
    GetUsersProperty
  );

  const properties = useMemo(
    () =>
      data && data.length > 0 ? (
        data.map((property, index) => (
          <PropertyInsightCard property={property} key={index} />
        ))
      ) : (
        <p>You have no properties. Let&#39;s go add one!</p>
      ),
    [data]
  );

  console.log("User's Properties: ", data);

  return (
    <>
      {isLoading && <PropertiesSkeleton />}
      {!isLoading && error && <p>Error: {error}</p>}
      {!isLoading && (
        <div
          className={cn(
            "grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full",
            className
          )}
        >
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
