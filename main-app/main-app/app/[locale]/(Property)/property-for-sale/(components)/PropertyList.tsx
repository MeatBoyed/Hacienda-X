"use client";

import React from "react";
import { useSearch } from "./SearchContext";
import PropertyCard from "@/components/main/PropertyCard";
import { NotFoundViewCard } from "@/components/main/Views/Views";

export const PropertyList: React.FC = () => {
  const { properties, isLoading } = useSearch();

  if (isLoading) {
    return <div className="text-center">Loading properties...</div>;
  }

  if (properties.length === 0) {
    return <NotFoundViewCard />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
};
