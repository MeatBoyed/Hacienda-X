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
