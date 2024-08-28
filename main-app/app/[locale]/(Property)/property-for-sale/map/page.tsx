import { MapComp } from "@/components/Map";
import { SearchBar } from "@/components/SearchBar";
import { getProperties } from "@/lib/RequestService";
import { notFound } from "next/navigation";

export default async function MapSearchView() {
  const data = await getProperties();

  if (!data) return notFound();

  return (
    <div className="flex justify-between flex-col gap-2 w-full min-h-screen mt-24 lg:mt-16 bg-white mb-10">
      <SearchBar classname="hidden md:flex w-full pt-5" mapView />
      <div className=" w-[100vw] min-h-screen">
        <MapComp height={"100vh"} properties={data} focusedProperty={data[0]} />
      </div>
    </div>
  );
}
