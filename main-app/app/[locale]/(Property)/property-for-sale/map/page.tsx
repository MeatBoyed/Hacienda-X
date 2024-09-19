import PropertyMap from "@/components/main/Maps/Map";
import { MapContextProvider } from "@/components/main/Maps/MapContext";
import { MapComp } from "@/components/Map";
import { SearchBar } from "@/components/SearchBar";
import { GetRequestService } from "@/lib/services/GetRequestService";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { notFound } from "next/navigation";
import { SearchFilterCard } from "../(components)/SearchFilterCard";
import { SearchProvider } from "../(components)/SearchContext";
import SearchMap from "./(components)/SearchMap";

export default async function MapSearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const response = await GetRequestService.getSearchProperties(
    new URLSearchParams(searchParams as Record<string, string>)
  );

  if (!response) return notFound();

  const properties = response.properties as PropertyWithAddress[];

  return (
    <SearchProvider initialProperties={properties}>
      <div className="w-full flex flex-col justify-center items-center gap-10 px-4 pt-24 md:pt-10 pb-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold mb-8 text-center">Find Your Dream Property</h1>
          <SearchFilterCard />
        </div>
        <div className="w-[100vw] h-[50vh] min-h-screen px-4">
          <SearchMap focusProperty={properties[0].property_id} />
        </div>
      </div>
    </SearchProvider>
  );
}
