"use client";

import useSWR from "swr";
import { GetUsersProperty } from "@/lib/RequestUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import PropertyInsightCard, {
  PropertyInsightCardSkeleton,
} from "../../_components/PropertyInsightCard";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function Properties({ className }: { className?: string }) {
  const t = useTranslations("Dashboard.propertiesComp");
  const { data, error, isLoading } = useSWR<PropertyWithAddress[]>(
    "/api/dashboard/property",
    GetUsersProperty
  );

  const properties = useMemo(
    () =>
      data && data.length > 0 ? (
        data.map((property, index) => <PropertyInsightCard property={property} key={index} />)
      ) : (
        <p>{t("noProperties")}</p>
      ),
    [data, t]
  );

  if (!data) {
    return (
      <div className="flex flex-col justify-center items-center py-20 gap-5">
        {/* <h1>{t("Index.Residencies.error")}</h1> */}
      </div>
    );
  }

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
