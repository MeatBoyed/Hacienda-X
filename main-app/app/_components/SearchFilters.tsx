"use client";

import React, { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SelectBathroomsOptions, SelectBedroomsOptions } from "@/lib/FormUtils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface SearchFormElements extends HTMLFormControlsCollection {
  bedrooms: HTMLInputElement;
  bathrooms: HTMLInputElement;
  price: HTMLInputElement;
}
interface SearchFormElement extends HTMLFormElement {
  readonly elements: SearchFormElements;
}

export default function SearchFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function submitHandler(event: FormEvent<SearchFormElement>) {
    // event.preventDefault();
    const bedrooms = event.currentTarget.elements.bedrooms.value;
    const bathrooms = event.currentTarget.elements.bathrooms.value;
    const price = event.currentTarget.elements.price.value;

    const params = new URLSearchParams();
    if (parseInt(bedrooms) > 0) {
      params.set("bedrooms", bedrooms);
    }
    if (parseInt(bathrooms) > 0) {
      params.set("bathrooms", bathrooms);
    }
    if (parseInt(price) > 0) {
      params.set("price", price);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-center items-center w-full">
      {/* Filter options */}
      <form onSubmit={submitHandler} className="w-full h-full">
        <div className="flex justify-center items-center flex-wrap text-black w-full gap-8">
          <div className="flex justify-center items-start flex-col w-full gap-2">
            <Label>Bedrooms</Label>
            <Select
              name="bedrooms"
              defaultValue={searchParams.get("bedrooms") || undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Beds" />
              </SelectTrigger>
              <SelectContent>
                {SelectBedroomsOptions.map((option) => (
                  <SelectItem key={option.key} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-start flex-col w-full gap-2">
            <Label>Bathrooms</Label>
            <Select
              name="bathrooms"
              defaultValue={searchParams.get("bathrooms") || undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Baths" />
              </SelectTrigger>
              <SelectContent>
                {SelectBathroomsOptions.map((option) => (
                  <SelectItem key={option.key} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-start flex-col w-full gap-2">
            <Label>Price</Label>
            <Select
              name="price"
              defaultValue={searchParams.get("price") || undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - 50K</SelectItem>
                <SelectItem value="1">150K - 200K</SelectItem>
                <SelectItem value="2">250K - 500K</SelectItem>
                <SelectItem value="3">500K - 1M</SelectItem>
                <SelectItem value="4">1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex space-x-3">
            <Button
              type="button"
              onClick={() => router.push(`/property-for-sale`)} // TODO: Hard reset on
              variant={"outline"}
              className="hover:bg-red-500 hover:text-white"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-blue-500 hover:text-white w-full shadow-md"
            >
              Apply filter
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
