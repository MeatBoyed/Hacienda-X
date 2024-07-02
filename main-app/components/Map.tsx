"use client";

import React, { useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Bath, BedDouble, Home, Ruler, XCircle } from "lucide-react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import Link from "next/link";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { Card, CardContent } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { MdPool } from "react-icons/md";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "./ui/badge";

// FIX Popup's state not resetting

export function MapComp({
  focusedProperty,
  properties,
  height,
}: {
  focusedProperty: PropertyWithAddress;
  properties: PropertyWithAddress[];
  height: string;
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
    [focusedProperty]
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
                  <PropertyTagMarker
                    price={property.price}
                    saleType={property.saleType}
                  />
                </Marker>
              )}
            </>
          ))}
      </>
    ),
    [properties]
  );

  return (
    <Map
      initialViewState={{
        longitude: focusedProperty.Address?.longitude,
        latitude: focusedProperty.Address?.latitude,
        zoom: 15, // 3.5 in example
      }}
      style={{ width: "100%", height: height, borderRadius: 10 }}
      // mapStyle="mapbox://styles/mapbox/streets-v9"
      mapStyle="mapbox://styles/meatboyed/clvz01a2901xh01o099c695mu"
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
          closeButton={false}
          className="w-full p-4 h-20"
        >
          <PropertyPopup property={focusedProperty} />
        </Popup>
      )}

      {popupInfo && (
        <Popup
          longitude={popupInfo.Address?.longitude || 0}
          latitude={popupInfo.Address?.latitude || 0}
          anchor="bottom"
          onClose={() => setPopupInfo(null)}
          closeButton={false}
          className="w-full p-4 h-20"
        >
          <PropertyPopup property={popupInfo} />
        </Popup>
      )}
    </Map>
  );
}

function PropertyPopup({ property }: { property: PropertyWithAddress }) {
  return (
    <div className="flex justify-center items-start gap-3 w-full flex-col ">
      <Link href={`/property-for-sale/${property.property_id}`}>
        <div
          className={cn(
            "relative h-32  w-full overflow-hidden rounded-xl  hover:cursor-pointer"
          )}
        >
          <Image
            src={property.images[0]} // Assuming you have an array of images
            alt={"yess"}
            width={320}
            height={300}
            className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out hover:scale-110"
          />
          <p className="absolute top-0 right-0 mr-2 mt-2 rounded-sm bg-[#1f93ff] px-2 py-1 text-xs font-semibold text-white">
            {property.saleType}
          </p>
        </div>
      </Link>
      <div className="flex gap-3 justify-start items-center overflow-hidden">
        <div className="flex justify-center items-center gap-2">
          <BedDouble size={20} />
          <p className="leading-7">{property.bedrooms}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Bath size={20} />
          <p className="leading-7">{property.bathrooms}</p>
        </div>
        {property.pool && (
          <div className="flex justify-center items-center gap-2">
            <MdPool size={20} />
            <p className="leading-7">{property.pool && "Yes"}</p>
          </div>
        )}
        {property.squareMeter && (
          <div className="flex justify-center items-center gap-2">
            <Ruler size={20} />
            <p className="leading-7">
              {property.squareMeter.toLocaleString()} m&#178;
            </p>
          </div>
        )}
      </div>
      <Link
        href={`/property-for-sale/${property.property_id}`}
        className="line-clamp-1 text-sm font-medium leading-none"
      >
        {property.title}
      </Link>
      <p className="text-lg font-semibold">
        R {property.price.toLocaleString()}
      </p>
      <Link
        className={buttonVariants({
          size: "lg",
          variant: "outline",
          className:
            "w-full bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
        })}
        href={`/property-for-sale/${property.title}`}
      >
        View Property
      </Link>
    </div>
  );
}

function PropertyTagMarker({
  price,
  saleType,
}: {
  price: number;
  saleType: string;
}) {
  return (
    <div className="bg-background px-3 py-2 rounded-full shadow-md flex justify-center items-center gap-2 hover:cursor-pointer">
      <p className="text-base font-semibold">R {price.toLocaleString()}</p>
      <Badge className="text-white bg-[#1f93ff] hover:bg-[#1f93ff] hover:cursor-pointer">
        For {saleType}
      </Badge>
    </div>
  );
}
