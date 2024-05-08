"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import PinIcon from "@/public/MapPin.png";
import "leaflet/dist/leaflet.css";
import { Property } from "@prisma/client";
import { cn } from "@/lib/utils";

interface marker {
  geocode: LatLngExpression;
  message: string;
}

export function MapViewer({
  properties,
  className,
}: {
  properties: Property[];
  className: string;
}) {
  // const center: LatLngExpression = [-26.1045525, 28.0545147];
  const center: LatLngExpression = [
    properties[0].latitude,
    properties[0].longitude,
  ];

  const customIcon = new Icon({
    iconUrl: PinIcon.src,
    iconSize: [38, 38],
  });

  return (
    <div className={cn("w-full", className)} id="Map">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map((property, index) => {
          const location: LatLngExpression = [
            property.latitude,
            property.longitude,
          ];

          return (
            <Marker key={index} position={location} icon={customIcon}>
              <Popup>
                <h2>{property.description}</h2>
              </Popup>
            </Marker>
          );
        })}
        {/* {markers.map((location, index) => (
          <Marker key={index} position={location.geocode} icon={customIcon}>
            <Popup>
              <h2>{location.message}</h2>
            </Popup>
          </Marker>
        ))} */}
      </MapContainer>
    </div>
  );
}
