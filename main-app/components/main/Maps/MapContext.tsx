"use client";

import { PropertyWithAddress } from "@/Server/utils/utils";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useState, useEffect } from "react";

export interface Address {
  address: string;
  lat: number;
  lng: number;
}

// Enabling TS features
export type MapContext = {
  mainProperty: PropertyWithAddress;
  properties: PropertyWithAddress[];
  openProperty: (property: PropertyWithAddress) => void;
};

export const MapContext = createContext<MapContext | null>(null);

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }
  return context as MapContext;
}

export const MapContextProvider: React.FC<{
  properties: PropertyWithAddress[]
  children: React.ReactNode;
}> = ({ children, properties }) => {

  const [mainProperty, setMainProperty] = useState<PropertyWithAddress>(property);
  const [openedProperty, setOpenedProperty] = useState<PropertyWithAddress | null>(null);


  const openProperty = useCallback((property: PropertyWithAddress) => {
    setOpenedProperty(property);
    setMainProperty(property);
  }, []);


  return <MapContext.Provider value={{ mainProperty, properties, openProperty }}>{children}</MapContext.Provider>;
};

const property: PropertyWithAddress = {
  property_id: "clxrdwwl10001eszwdx5qrbh9",
  agent_id: "user_2gL8ydFzjP48FfpXuW73nUO5qXw",
  title: "News Cafe Sandton",
  description: "Happy hour during 2-6pm - Long Islands are only R70 ;)",
  price: 12000000,
  bathrooms: 2,
  bedrooms: 4,
  pool: false,
  extraFeatures: ["Happy hour", "Covered Parking"],
  squareMeter: 100,
  images: [
    "https://dstilezauto.s3.af-south-1.amazonaws.com/haciendaXTest/user_2gL8ydFzjP48FfpXuW73nUO5qXw/959326bd-17b6-45fd-b61d-28c191255548",
    "https://dstilezauto.s3.af-south-1.amazonaws.com/haciendaXTest/user_2gL8ydFzjP48FfpXuW73nUO5qXw/0cd47070-d942-47f1-bda7-1b05fdf3a19b",
    "https://dstilezauto.s3.af-south-1.amazonaws.com/haciendaXTest/user_2gL8ydFzjP48FfpXuW73nUO5qXw/fbd60f8b-ad6b-4d84-99ad-115d5df8f469",
  ],
  saleType: "Sale",
  sold: false,
  visibility: "Public",
  createdAt: new Date("2024-06-23T10:07:00.000Z"),
  updatedAt: new Date("2024-06)-23T10:07):00.000Z"),
  Address: {
    address_id: "clxrdwwl10002eszwnj2xzse5",
    address: "Cnr Rivonia Boulevard &, Rivonia, 9th Ave, Rivonia, Sandton, 2128, South Africa",
    latitude: -26.0576438,
    longitude: 28.0604735,
    property_id: "clxrdwwl10001eszwdx5qrbh9",
  },
};