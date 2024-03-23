"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import PinIcon from "../app/Lib/Imgs/MapPin.png";
import "leaflet/dist/leaflet.css";

interface marker {
  geocode: LatLngExpression;
  message: string;
}

export default function MapViewer() {
  const center: LatLngExpression = [-26.1045525, 28.0545147];

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
    <div className="w-full h-[80vh]">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((location) => (
          <Marker position={location.geocode} icon={customIcon}>
            <Popup>
              <h2>{location.message}</h2>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
