import React from "react";
import "./Properties.css";
import SearchProperty from "./_components/SearchProperty";

export default async function PropertiesSearch() {
  //   const { data, isError, isLoading } = useProperties();

  return (
    <div className="bg-background">
      <div className="flex justify-center items-center w-full py-20">
        {/* Hanldes the Client Side functionality of Searching Properties */}
        <SearchProperty />
      </div>
    </div>
  );
}
