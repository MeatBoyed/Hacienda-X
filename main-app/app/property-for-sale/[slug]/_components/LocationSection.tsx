import { MapViewer } from "@/components/Map";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { Property } from "@prisma/client";
import { Home, MapPin, UserIcon } from "lucide-react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import Pin from "@/public/MapPin.png";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

export default function LocationSection({ property }: { property: Property }) {
  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    return <h1>Error...</h1>;
  }
  return (
    <section className="flex justify-center items-center w-full flex-col">
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Where it is
        </h3>
        <div className="w-full h-full mb-8">
          <MapComp property={property} />
        </div>
        <Button variant="link" className="text-text ">
          Find properties in this area
        </Button>
      </div>
    </section>
  );
}

function MapComp({ property }: { property: Property }) {
  "use client";

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const pageProperty = useMemo(
    () => (
      <Marker
        longitude={property.longitude}
        latitude={property.latitude}
        anchor="center"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowPopup(true);
        }}
      >
        <div className="bg-background p-2 rounded-full shadow-md">
          <Home size={18} className="text-red-500" />
        </div>
      </Marker>
    ),
    []
  );

  return (
    <Map
      initialViewState={{
        longitude: property.longitude,
        latitude: property.latitude,
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
      {pageProperty}

      {/* Render Related Property Pins */}

      {/* Page-Property PopUp */}
      {showPopup && (
        <Popup
          longitude={property.longitude}
          latitude={property.latitude}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
          className="w-32 h-20"
        >
          <p className="leading-7">{property.title}</p>
          <p className="text-lg font-semibold">{property.price}</p>
          <Link
            className="leading-7"
            href={`/property-for-sale/${property.title}`}
          >
            View Property
          </Link>
        </Popup>
      )}
    </Map>
  );
}
