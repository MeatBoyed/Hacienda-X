import { Home, Badge } from "lucide-react";
import { useMemo } from "react";
import { Marker } from "react-map-gl";
import { useMapContext } from "./MapContext";

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