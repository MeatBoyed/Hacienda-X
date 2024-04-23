"use client";
import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import * as ELG from "esri-leaflet-geocoder";
import {} from "esri-leaflet-geocoder";

let DefaulIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});
L.Marker.prototype.options.icon = DefaulIcon;

const GeoCoderMarker = ({ address }: { address: any }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]);

  useEffect(() => {
    // ELG.geocode()
    //   .text(address)
    //   .run((err: any, results: { results: string | any[] }, response: any) => {
    //     if (results?.results?.length > 0) {
    //       const { lat, lng } = results?.results[0].latlng;
    //       setPosition([lat, lng]);
    //       map.flyTo([lat, lng], 6);
    //     }
    //   });
  }, [address]);

  return (
    <Marker position={{ lat: position[0], lng: position[1] }} icon={DefaulIcon}>
      <Popup />
    </Marker>
  );
};

export default GeoCoderMarker;
