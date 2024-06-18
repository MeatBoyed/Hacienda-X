"use client";
import { GenericPropertyResponse } from "@/app/api/(utils)/utils";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import PropertyInsightCard from "../../_components/PropertyInsightCard";
import { GetUsersProperty } from "@/lib/RequestUtils";

export default function Properties() {
  const { data, error, isLoading } = useSWR(
    "/api/properties/dashboard",
    GetUsersProperty
  );

  console.log("User's Properties: ", data);

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {/* {data &&
        data.results.map((property, index) => (
          <PropertyInsightCard key={index} />
        ))} */}
    </div>
  );
}
