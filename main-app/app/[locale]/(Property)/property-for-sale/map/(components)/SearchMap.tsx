"use client";
import { MapContextProvider } from "@/components/main/Maps/MapContext";
import { useSearch } from "../../(components)/SearchContext";
import PropertyMap from "@/components/main/Maps/Map";

export default function SearchMap({ focusProperty }: { focusProperty: string }) {
  const { properties } = useSearch();

  return (
    <MapContextProvider focusProperty={focusProperty} properties={properties}>
      <PropertyMap
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          gridColumn: "",
        }}
      />
    </MapContextProvider>
  );
}
