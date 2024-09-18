import { Home } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Marker } from "react-map-gl";
import { useMapContext } from "./MapContext";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

  const validatedProperties = useCallback(() => {
    return properties.filter((property) => {
      if (property.Address) {
        return (
          property.Address.latitude >= -90 &&
          property.Address.latitude <= 90 &&
          property.Address.longitude >= -90 &&
          property.Address.longitude <= 90
        );
      }
      console.log("Property with Bad Address: ", property);
      return false;
    });
  }, []);
  const propertyMarkers = useMemo(() => {
    return validatedProperties().map((property, index) => {
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
            <PropertyTagMarker
              title={property.title}
              price={property.price}
              saleType={property.saleType}
            />
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

function PropertyTagMarker({
  title,
  price,
  saleType,
}: {
  title: string;
  price: number;
  saleType: string;
}) {
  return (
    <Link
      href={`/property-for-sale/${title}`}
      className="bg-background px-3 py-2 rounded-full shadow-md flex justify-center items-center gap-2 hover:cursor-pointer"
    >
      <p className="text-base font-semibold">R {price.toLocaleString()}</p>
      <Badge className="text-white bg-[#1f93ff] hover:bg-[#1f93ff] hover:cursor-pointer">
        For {saleType}
      </Badge>
    </Link>
  );
}
