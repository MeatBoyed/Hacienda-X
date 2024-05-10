"use client";

import React, { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Home } from "lucide-react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import Link from "next/link";
import { PropertyWithAddress } from "@/app/api/[[...route]]/utils";

// FIX Popup's state not resetting

export function MapComp({
  focusedProperty,
  properties,
}: {
  focusedProperty: PropertyWithAddress;
  properties: PropertyWithAddress[];
}) {
  const [showFocusedPropPopup, setShowFocusedPropPopup] =
    useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<PropertyWithAddress | null>(null);

  const focusedPropertyMarker = useMemo(
    () => (
      <>
        {focusedProperty.Address && (
          <Marker
            longitude={focusedProperty.Address.longitude}
            latitude={focusedProperty.Address.latitude}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setShowFocusedPropPopup(true);
            }}
          >
            <div className="bg-background p-2 rounded-full shadow-md">
              <Home size={18} className="text-red-500" />
            </div>
          </Marker>
        )}
      </>
    ),
    []
  );

  const propertiesMarkers = useMemo(
    () => (
      <>
        {properties &&
          properties.map((property, index) => (
            <>
              {property.Address && (
                <Marker
                  longitude={property.Address.longitude}
                  latitude={property.Address.latitude}
                  anchor="center"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    setPopupInfo(property);
                  }}
                  key={index}
                >
                  <div className="bg-background p-2 rounded-full shadow-md">
                    {/* <Home size={18} className="text-red-500" /> */}
                    <p className="text-base font-semibold">
                      $ {property.price.toLocaleString()}
                    </p>
                  </div>
                </Marker>
              )}
            </>
          ))}
      </>
    ),
    []
  );

  return (
    <Map
      initialViewState={{
        longitude: focusedProperty.Address?.longitude,
        latitude: focusedProperty.Address?.latitude,
        zoom: 15, // 3.5 in example
      }}
      style={{ width: "100%", height: "55vh", borderRadius: 10 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
    >
      {/* User Map Controls */}
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />

      {/* Render Page-Property Pin*/}
      {focusedPropertyMarker}

      {/* Render (Related) Property Pins */}
      {propertiesMarkers}

      {/* Page-Property PopUp */}
      {showFocusedPropPopup && (
        <Popup
          longitude={focusedProperty.Address?.longitude || 0}
          latitude={focusedProperty.Address?.latitude || 0}
          anchor="bottom"
          onClose={() => setShowFocusedPropPopup(false)}
          className="w-32 h-20"
        >
          <p className="leading-7">{focusedProperty.title}</p>
          <p className="text-lg font-semibold">
            $ {focusedProperty.price.toLocaleString()}
          </p>
          <Link
            className="leading-7"
            href={`/property-for-sale/${focusedProperty.title}`}
          >
            View Property
          </Link>
        </Popup>
      )}

      {popupInfo && (
        <Popup
          longitude={popupInfo.Address?.longitude || 0}
          latitude={popupInfo.Address?.latitude || 0}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          className="w-32 h-20"
        >
          <p className="leading-7">{focusedProperty.title}</p>
          <p className="text-lg font-semibold">
            $ {focusedProperty.price.toLocaleString()}
          </p>
          <Link
            className="leading-7"
            href={`/property-for-sale/${focusedProperty.title}`}
          >
            View Property
          </Link>
        </Popup>
      )}
    </Map>
  );
}
