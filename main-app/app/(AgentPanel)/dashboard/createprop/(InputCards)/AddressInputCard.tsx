"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { env } from "process";
import { AddressAutofill, Geocoder } from "@mapbox/search-js-react";
import { useState } from "react";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import AddressInput from "../_components/AddressInput";

export default function AddressInputCard() {
  const [address, setAddress] = useState<string>();
  const [geoLocation, setGeoLocation] = useState<{ lat: number; long: number }>(
    { lat: 0, long: 0 }
  );

  console.log("Address: ", address);
  console.log("Geo - Location", geoLocation);

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription>Help us locate your property.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Address</Label>
              <AddressInput
                onAddressSelect={(address) => setAddress(address)}
                onGeoLocationSelect={(latitude, longitude) =>
                  setGeoLocation({ lat: latitude, long: longitude })
                }
              />
              {/* <Input
                id="address"
                type="text"
                className="w-full"
                placeholder="Address"
                autoComplete="address-line1"
              /> */}
            </div>
            {/* <div className="grid gap-3">
              <Label htmlFor="description">Apartment number</Label>
              <Input
                id="apartment"
                type="text"
                className="w-full"
                placeholder="Apartment Number"
                autoComplete="address-line2"
              />
            </div> */}
            {/* <div className="grid gap-3">
              <Label htmlFor="description">City</Label>
              <Input
                id="city"
                type="text"
                className="w-full"
                placeholder="City"
                autoComplete="address-level2"
              />
            </div> */}
            {/* <div className="grid gap-3">
              <Label htmlFor="description">State</Label>
              <Input
                id="state"
                type="text"
                className="w-full"
                placeholder="State"
                autoComplete="address-level1"
              />
            </div> */}
            {/* <div className="grid gap-3">
              <Label htmlFor="description">Country</Label>
              <Input
                id="country"
                type="text"
                className="w-full"
                placeholder="Country"
                autoComplete="country"
              />
            </div> */}
            {/* <div className="grid gap-3">
              <Label htmlFor="description">Postcode</Label>
              <Input
                id="postcode"
                type="text"
                className="w-full"
                placeholder="Postcode"
                autoComplete="postal-code"
              />
            </div> */}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
