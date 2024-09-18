"use client";
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { env } from "@/env";
import { useMapContext } from "./MapContext";
import { Markers } from "./MapMarkers";
import { useState } from "react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PropertyMap({ style }: { style?: React.CSSProperties }) {
  const { mainProperty } = useMapContext();

  return (
    <Map
      initialViewState={{
        longitude: mainProperty.Address?.longitude || 20,
        latitude: mainProperty.Address?.latitude || -20,
        zoom: 15, // 3.5 in example
      }}
      style={style}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/haciendax/clykm2gp5011601pn7nvjanc3"
      mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      {/* User Map Controls */}
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      <Markers />
    </Map>
  );
}

export function MapDisplayer() {
  const [isMapActive, setIsMapActive] = useState(true);
  return (
    <>
      {isMapActive ? (
        <PropertyMap
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            gridColumn: "",
          }}
        />
      ) : (
        <div className="h-full flex flex-col justify-center items-center gap-8 bg-blend-overlay">
          <CardTitle>Find more properties in the area</CardTitle>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              console.log("changed");
              setIsMapActive(true);
            }}
          >
            Open Map
          </Button>
        </div>
      )}
    </>
  );
}
