"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "./GeoCoderMarker";
const Map = ({
  address,
  city,
  country,
}: {
  address: any;
  city: any;
  country: any;
}) => {
  return (
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  );
};

export default Map;