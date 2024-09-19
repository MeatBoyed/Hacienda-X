import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import PropertyMap, { MapDisplayer } from "./Map";
import { MapContextProvider } from "./MapContext";
import { GetRequestService } from "@/lib/services/GetRequestService";

export async function MapCard({
  className,
  mainProperty,
}: {
  className?: string;
  mainProperty: string;
}) {
  // Fetching Properties from API
  const propertiesRes = await GetRequestService.getProperties();
  if (!propertiesRes) {
    console.log("Failed to get properties!");
    return <p>Failed to Load properties</p>;
  }
  const properties = propertiesRes.properties as PropertyWithAddress[];

  return (
    <MapContextProvider focusProperty={mainProperty} properties={properties}>
      <div className="flex justify-between items-start w-full gap-3">
        {/* <PropertyInfoCard /> */}
        <Card className={cn(className, "w-full h-[40vh] md:h-[50vh]")}>
          <MapDisplayer />
        </Card>
      </div>
    </MapContextProvider>
  );
}
