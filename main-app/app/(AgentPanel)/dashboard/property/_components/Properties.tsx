"use client";
import useSWR from "swr";
import { GetUsersProperty } from "@/lib/RequestUtils";
import { GenericPropertyResponse } from "@/app/api/(utils)/utils";
import PropertyInsightCard, {
  PropertyInsightCardSkeleton,
} from "../../_components/PropertyInsightCard";

export default function Properties() {
  const { data, error, isLoading } = useSWR<GenericPropertyResponse>(
    "/api/properties/dashboard/property",
    GetUsersProperty
  );

  console.log("User's Properties: ", data);

  return (
    <>
      {isLoading && <PropertiesSkeleton />}
      {!isLoading && data && (
        <div className="grid gap-4 lg:grid-cols-4 w-full">
          {data.results.map((property, index) => (
            <PropertyInsightCard property={property} key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export function PropertiesSkeleton() {
  return (
    // <PropertyInsightCardSkeleton />
    <div className="grid grid-cols-4 gap-8">
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
