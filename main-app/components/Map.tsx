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
  classname,
}: {
  properties: Property[];
  classname: string;
}) {
  // const center: LatLngExpression = [-26.1045525, 28.0545147];
  const center: LatLngExpression = [
    properties[0].latitude,
    properties[0].longitude,
  ];

  const markers: marker[] = [
    {
      geocode: [-26.09358, 28.04788],
      message: "Varsity College Sandton",
    },
    {
      geocode: [-26.10922, 28.05284],
      message: "Sandton City",
    },
    {
      geocode: [-26.10581, 28.05323],
      message: "Virgin Action Sandton",
    },
    {
      geocode: [-26.09464, 28.05486],
      message: "Midiclinic Morningside",
    },
  ];

  const customIcon = new Icon({
    iconUrl: PinIcon.src,
    iconSize: [38, 38],
  });

  return (
    <div className={cn("w-full", classname)} id="Map">
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
