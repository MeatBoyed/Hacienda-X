"use client";
import React from "react";
import { HiLocationMarker } from "react-icons/hi";

export default function SearchBar({
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
