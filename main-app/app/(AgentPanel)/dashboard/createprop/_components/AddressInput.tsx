"use client";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import React from "react";

const libs: Library[] = ["core", "places"];

interface AddressResult {
  address: string;
  lat: number;
  lng: number;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (result: AddressResult) => void;
}

const AddressInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, handleChange, ...props }, ref) => {
    // Address Input's AutoComplete
    const [autoComplete, setAutoComplete] =
      useState<google.maps.places.Autocomplete | null>(null);
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      libraries: libs,
    });

    useEffect(() => {
      if (isLoaded) {
        const SearchBoundary = new google.maps.LatLngBounds(
          new google.maps.LatLng(
            { lat: -26.530696799595123, lng: 27.159219669061535 } // south west
          ),
          new google.maps.LatLng(
            { lat: -25.503934936857508, lng: 29.079928111094414 } // north east
          )
        );
        const autoComplete = new google.maps.places.Autocomplete(
          placesAutoCompleteRef.current as HTMLInputElement,
          {
            fields: ["formatted_address", "geometry"], // Filtering response for specific fields (usage optimisation)
            bounds: SearchBoundary,
            componentRestrictions: {
              country: ["za"],
            },
          }
        );
        setAutoComplete(autoComplete);
      }
    }, [isLoaded]);

    useEffect(() => {
      if (autoComplete) {
        autoComplete.addListener("place_changed", () => {
          const place = autoComplete.getPlace();
          if (place.formatted_address && place.geometry?.location) {
            handleChange({
              address: place.formatted_address as string,
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            });
          }
        });
      }
    }, [autoComplete]);

    const placesAutoCompleteRef = useRef<HTMLInputElement>(null);

    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={placesAutoCompleteRef}
        {...props}
      />
    );
  }
);
AddressInput.displayName = "AddressInput";

export { AddressInput };
