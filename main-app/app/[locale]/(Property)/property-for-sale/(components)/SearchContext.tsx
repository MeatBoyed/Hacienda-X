// File: app/search/SearchContext.tsx
"use client";

import React, { createContext, useContext, useCallback, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { PropertyServiceResponse } from "@/Server/lib/PropertyService";
import { SearchParams } from "@/Server/controllers/propertyController";
import { PriceRangeEnum, PriceRanges, SortByEnum, SortByOptions } from "@/Server/lib/BussinessLogicHandler";
import { env } from "@/env";

type SearchContextType = {
  searchTerm: string;
  propertyType: string;
  priceRange: PriceRanges;
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  sortBy: SortByOptions;
  updateSearch: (key: SearchParams, value: string) => void;
  properties: PropertyWithAddress[];
  isLoading: boolean;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<React.PropsWithChildren<{ initialProperties: PropertyWithAddress[] }>> = ({
  children,
  initialProperties,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<PropertyWithAddress[]>(initialProperties);
  const [isLoading, setIsLoading] = useState(false);

  const searchTerm = searchParams.get(SearchParams.searchTerm) || "";
  const propertyType = searchParams.get(SearchParams.propertyType) || "any";
  const priceRange = (searchParams.get(SearchParams.priceRange) as PriceRanges) || PriceRangeEnum.Enum.any;
  const bedrooms = searchParams.get(SearchParams.bedrooms) || "0";
  const bathrooms = searchParams.get(SearchParams.bathrooms) || "0";
  const amenities: string[] = searchParams.get(SearchParams.amenities)?.split(",") || [];
  const sortBy = (searchParams.get(SearchParams.sortBy) as SortByOptions) || SortByEnum.Enum.recommended;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const updateSearch = useCallback(
    (key: SearchParams, value: string) => {
      router.push("?" + createQueryString(key, value));
    },
    [router, createQueryString]
  );

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${env.NEXT_PUBLIC_HOST_URL}/api/properties/search?${searchParams.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = (await response.json()) as PropertyServiceResponse;
        setProperties(data.properties);
        data.properties.map((property) => {
          property.extraFeatures.map((feature) => {
            if (!amenities.find((amenity) => amenity === feature)) {
              amenities.push(feature);
            }
          });
        });
      } catch (error) {
        console.error("Error fetching properties:", error);
        // Here you might want to set an error state and display it to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  const value = {
    searchTerm,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    amenities,
    sortBy,
    updateSearch,
    properties,
    isLoading,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
