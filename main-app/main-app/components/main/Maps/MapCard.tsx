import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import PropertyMap from "./Map";
import { MapContextProvider } from "./MapContext";

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
