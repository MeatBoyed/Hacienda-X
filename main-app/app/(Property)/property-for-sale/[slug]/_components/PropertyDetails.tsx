import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bath, Bed, CheckCircle, Ruler } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PropertyWithAddress,
  PropertyWithAddressAndAgent,
} from "@/app/api/(utils)/utils";

export default function PropertyDetails({
  property,
}: {
  property: PropertyWithAddressAndAgent;
}) {
  return (
    <section
      id="propertyDetails"
      className="flex justify-center items-center flex-col w-full px-2 "
    >
      {/* Description */}
      <div className="border-t border-b border-[#dddddd] py-10 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          About the property
        </h3>

        <div className="flex justify-center items-start flex-col gap-2">
          <p className="text-sm">{property.description}</p>
        </div>
      </div>

      {/* About the Agent (Agent Details) */}
      <div className="border-t border-b border-[#dddddd] py-10 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Meet your agent
        </h3>

        <div className="flex justify-center items-start flex-row gap-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex justify-center items-start gap-2 flex-col">
            <p className="text-sm font-semibold leading-none">
              Agents Name // TODO: Add Agent info
            </p>
            <p className="leading-7 text-xs">Card Description</p>
          </div>
        </div>
      </div>

      {/* Offer / Features */}
      <div className="border-t  border-[#dddddd] border-b-0 py-10 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          What this place offers
        </h3>

        <OffersList
          squareMeters={property.squareMeter || undefined}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          extraFeatures={property.extraFeatures}
        />
      </div>
    </section>
  );
}

function OffersList({
  bedrooms,
  bathrooms,
  squareMeters,
  extraFeatures,
}: {
  bedrooms: number;
  bathrooms: number;
  squareMeters?: number;
  extraFeatures: string[];
}) {
  return (
    <div className="flex justify-center items-start flex-col w-full gap-3">
      <div className="flex justify-center items-center gap-5">
        <Bed size={20} />
        <p className="leading-7">{bedrooms} Bedrooms</p>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Bath size={20} />
        <p className="leading-7">{bathrooms} Bathrooms</p>
      </div>
      {squareMeters && (
        <div className="flex justify-center items-center gap-5">
          <Ruler size={20} />
          <p className="leading-7">{squareMeters.toLocaleString()} m&#178;</p>
        </div>
      )}
      <div className="mt-5 flex justify-center items-start flex-col gap-3">
        <p className="leading-7 font-semibold">Extra Features</p>
        {extraFeatures.map((feature, index) => (
          <div key={index} className="flex justify-center items-center gap-5">
            <CheckCircle size={20} />
            <p className="leading-7">{feature} Bathrooms</p>
          </div>
        ))}
      </div>
    </div>
  );
}
