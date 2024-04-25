"use client";
import React, { Dispatch, SetStateAction } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export function SearchBar({
  filter,
  setFilter,
}: {
  filter?: any;
  setFilter?: any;
}) {
  return (
    <div className="flexCenter search-bar border border-black">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        placeholder="Search by title/city/country..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="button">Search</button>
    </div>
  );
}

export function SearchBox({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="w-full flex justify-center items-center border border-black px-2 py-3 rounded-md shadow-lg">
      <MapPinIcon />
      <Input
        placeholder="Search town, city, provience"
        className="border-0  ring-offset-0 text-black"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className="text-black">Go</button>
    </div>
  );
}

export function SearchBoxNonFunc() {
  return (
    <div className="w-full flex justify-center items-center rounded-md ">
      {/* <MapPinIcon /> */}
      <Input
        placeholder="Search town, city, provience"
        className="border-0  ring-offset-0 focus-visible:ring-offset-0 text-black shadow-lg "
      />
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="red"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-map-pin"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
