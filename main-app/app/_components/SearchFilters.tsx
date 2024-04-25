// filter.tsx

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SearchFilters() {
  return (
    <div className="flex justify-center items-center w-full">
      {/* Filter options */}
      <div className="flex justify-center items-center flex-wrap text-black w-full gap-8">
        <div className="flex justify-center items-start flex-col w-full gap-2">
          <Label>Bedrooms</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Beds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center items-start flex-col w-full gap-2">
          <Label>Bathrooms</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Baths" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center items-start flex-col w-full gap-2">
          <Label>Price</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">0 - 50K</SelectItem>
              <SelectItem value="2">150K - 200K</SelectItem>
              <SelectItem value="3">250K - 500K</SelectItem>
              <SelectItem value="4">500K - 1M</SelectItem>
              <SelectItem value="5">1M+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          size={"sm"}
          className="bg-[#05080b]  w-full  hover:border-[#05080b] hover:border hover:text-black shadow-md"
        >
          Apply filter
        </Button>
      </div>
    </div>
  );
}
