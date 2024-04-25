// filter.tsx

import React from "react";
import "./SearchFilters.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SearchFilters() {
  return (
    <div className="flex justify-center items-center w-full">
      <p>Filters</p>

      {/* Filter options */}
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uk">UK</SelectItem>
            <SelectItem value="america">America</SelectItem>
            <SelectItem value="europe">Europe</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
