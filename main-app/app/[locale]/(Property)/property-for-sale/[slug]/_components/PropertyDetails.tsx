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
import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import { SavePropertyBTN } from "@/lib/bookmarksContext";
import { useTranslations } from "next-intl";

export default function PropertyDetails({
  property,
}: {
  property: PropertyWithAddressAndAgent;
}) {
  const t = useTranslations("propertydetails");

  return (
    <section
      id="propertyDetails"
      className="flex justify-center items-center flex-col w-full px-2 "
    >
      <div className="pb-3 sm:max-w-3xl lg:max-w-4xl gap-3 w-full flex justify-start items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {property.title}
        </h3>
        <div className="hidden sm:block">
          <SavePropertyBTN property={property} />
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {t("aboutProperty")}
        </h3>

        <div className="flex justify-center items-start flex-col gap-2">
          <p className="text-sm">{property.description}</p>
        </div>
        <div className="flex justify-start w-full items-start">
          <p className="text-sm">
            {t("posted")}{" "}
            {typeof property.updatedAt === "string"
              ? new Date(property.updatedAt).toLocaleDateString()
              : property.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* About the Agent (Agent Details) */}
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {t("meetAgent")}
        </h3>

        <div className="flex justify-center items-start flex-row gap-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex justify-center items-start gap-2 flex-col">
            <p className="text-sm font-semibold leading-none">
              {property.agent.firstName} {property.agent.lastName}
            </p>
            {property.agent.company && (
              <p className="leading-7 text-xs">{property.agent.company}</p>
            )}
          </div>
        </div>
      </div>

      {/* Offer / Features */}
      <div className="border-t  border-[#dddddd] border-b-0 py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {t("offerTitle")}
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
  const t = useTranslations("propertydetails");

  return (
    <div className="flex justify-center items-start flex-col w-full gap-3">
      <div className="flex justify-center items-center gap-5">
        <Bed size={20} />
        <p className="leading-7">{t("bedrooms", { count: bedrooms })}</p>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Bath size={20} />
        <p className="leading-7">{t("bathrooms", { count: bathrooms })}</p>
      </div>
      {squareMeters && (
        <div className="flex justify-center items-center gap-5">
          <Ruler size={20} />
          <p className="leading-7">
            {t("squareMeters", { count: squareMeters.toLocaleString() })}
          </p>
        </div>
      )}
      <div className="mt-5 flex justify-center items-start flex-col gap-3">
        <p className="leading-7 font-semibold">{t("extraFeatures")}</p>
        {extraFeatures.map((feature, index) => (
          <div key={index} className="flex justify-center items-center gap-5">
            <CheckCircle size={20} />
            <p className="leading-7">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
