import React from "react";
import "./Properties.css";
import SearchProperty from "./_components/SearchProperty";

export default async function PropertiesSearch() {
  return (
    <div className="bg-white">
      <div className="pb-4 pt-16">
        <SearchProperty />
      </div>
    </div>
  );
}
