"use client";

import React from "react";
import { useSearch } from "./SearchContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Map } from "lucide-react";
import { SearchParams } from "@/Server/controllers/propertyController";
import { PriceRanges, SortByOptions } from "@/Server/lib/BussinessLogicHandler";

const priceRanges: { label: string; value: PriceRanges }[] = [
  { label: "Any", value: "any" },
  { label: "Under $200,000", value: "200000-400000" },
  { label: "$200,000 - $400,000", value: "200000-400000" },
  { label: "$400,000 - $600,000", value: "400000-600000" },
  { label: "$600,000 - $800,000", value: "600000-800000" },
  { label: "$800,000+", value: "800000-1000000" },
];

const bedBathRoomOptions = [
  { label: "Any", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];
const sortByOptions: { label: string; value: SortByOptions }[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Most Recent", value: "recent" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-dsc" },
  { label: "Size: Small to Large", value: "size-asc" },
  { label: "Size: Large to Small", value: "size-dsc" },
];

export const SearchFilterCard: React.FC = () => {
  const {
    searchTerm,
    propertyType,
    priceRange,
    bedrooms,
    bathrooms,
    amenities,
    sortBy,
    updateSearch,
  } = useSearch();

  const handleMapSearch = () => {
    console.log("Navigating to map search...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Search and Filter</span>
          <Button
            onClick={handleMapSearch}
            className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-800"
          >
            <Map className="w-4 h-4" />
            Map Search
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Label htmlFor="search" className="mb-2 block">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => updateSearch(SearchParams.searchTerm, e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="sort" className="mb-2 block">
                Sort By
              </Label>
              <Select
                value={sortBy}
                onValueChange={(value) => updateSearch(SearchParams.sortBy, value)}
              >
                <SelectTrigger id="sort" className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {sortByOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label htmlFor="property-type" className="mb-2 block">
                Property Type
              </Label>
              <Select
                value={propertyType}
                onValueChange={(value) => updateSearch(SearchParams.propertyType, value)}
              >
                <SelectTrigger id="property-type">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">All Types</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Villa">Villa</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bedrooms" className="mb-2 block">
                Bedrooms
              </Label>
              <Select
                value={bedrooms}
                onValueChange={(value) => updateSearch(SearchParams.bedrooms, value)}
              >
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bedBathRoomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bathrooms" className="mb-2 block">
                Bathrooms
              </Label>
              <Select
                value={bathrooms}
                onValueChange={(value) => updateSearch(SearchParams.bathrooms, value)}
              >
                <SelectTrigger id="bathrooms">
                  <SelectValue placeholder="Bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  {bedBathRoomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="price-range" className="mb-2 block">
                Price Range
              </Label>
              <Select
                value={priceRange}
                onValueChange={(value) => updateSearch(SearchParams.priceRange, value)}
              >
                <SelectTrigger id="price-range">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Amenities</Label>
            <div className="flex flex-wrap gap-4">
              {amenities.split(",").map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={(checked) => {
                      const newAmenities = checked
                        ? [...amenities.split(","), amenity]
                        : amenities.split(",").filter((a) => a !== amenity);
                      updateSearch(SearchParams.amenities, newAmenities.join(","));
                    }}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
