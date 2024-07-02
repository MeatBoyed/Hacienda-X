import React from "react";
import "./Properties.css";
import SearchProperty from "./_components/SearchProperty";

export default async function PropertiesSearch() {
  return (
    <div className="bg-white">
      <div className="mt-20 max-h-screen">
        <SearchProperty />
      </div>
    </div>
  );
}
