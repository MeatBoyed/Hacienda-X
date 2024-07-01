import { Button } from "@/components/ui/button";
import { Property } from "@prisma/client";
import { Home } from "lucide-react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { useState, useMemo } from "react";
import Link from "next/link";
import { MapComp } from "@/components/Map";
import { PropertyWithAddress } from "@/Server/utils/utils";

export default function LocationSection({
  property,
}: {
  property: PropertyWithAddress;
}) {
  return (
    <section className="flex justify-center items-center w-full flex-col">
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"></h3>
        <div className="w-full mb-8 min-h-[40vw]">
          <MapComp height="40vw" focusedProperty={property} properties={[]} />
        </div>
        <Button variant="link" className="text-text ">
          Find properties in this area
        </Button>
      </div>
    </section>
  );
}
