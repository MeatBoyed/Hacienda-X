"use client";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { env } from "@/env";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bath, Bed, Home, MapPin, Square } from "lucide-react";
import { useMemo, useState } from "react";
import { MapContextProvider, useMapContext, Address } from "./MapContext";
import PropertyInfoCard from "./PropertyInfoCard";
import { Badge } from "@/components/ui/badge";
import { PropertyWithAddress } from "@/Server/utils/utils";

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

export function Markers() {
  const { mainProperty, openProperty, properties } = useMapContext();

  const mainPropertyMarker = useMemo(
    () => (
      <Marker
        longitude={mainProperty.Address?.longitude || 20}
        latitude={mainProperty.Address?.latitude || -20}
        anchor="center"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          openProperty(mainProperty);
        }}
      >
        port
        <div className="bg-background p-2 rounded-full shadow-md cursor-pointer">
          <Home size={18} className="text-red-500" />
        </div>
      </Marker>
    ),
    [mainProperty]
  );

  const propertyMarkers = useMemo(() => {
    return properties.map((property, index) => {
      return (
        property.Address && (
          <Marker
            longitude={property.Address?.longitude || 20}
            latitude={property.Address?.latitude || -20}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              openProperty(property);
            }}
            key={index}
          >
            <PropertyTagMarker price={property.price} saleType={property.saleType} />
          </Marker>
        )
      );
    });
  }, [properties, openProperty]);

  return (
    <>
      {mainPropertyMarker}
      {propertyMarkers}
    </>
  );
}

export function MapCard({
  className,
  properties,
}: {
  className?: string;
  properties: PropertyWithAddress[];
}) {
  return (
    <MapContextProvider properties={properties}>
      <div className="flex justify-between items-start w-full gap-3">
        {/* <PropertyInfoCard /> */}
        <Card className={cn(className, "w-full h-[40vh] md:h-[50vh]")}>
          <PropertyMap
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
              gridColumn: "",
            }}
          />
        </Card>
      </div>
    </MapContextProvider>
  );
}

function PropertyTagMarker({ price, saleType }: { price: number; saleType: string }) {
  return (
    <div className="bg-background px-3 py-2 rounded-full shadow-md flex justify-center items-center gap-2 hover:cursor-pointer">
      <p className="text-base font-semibold">R {price.toLocaleString()}</p>
      <Badge className="text-white bg-[#1f93ff] hover:bg-[#1f93ff] hover:cursor-pointer">
        For {saleType}
      </Badge>
    </div>
  );
}
