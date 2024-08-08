import { MapComp } from "@/components/Map";
import { GenericPropertyResponse, PropertyWithAddress } from "@/Server/utils/utils";
import Residencies from "@/app/[locale]/_components/Residencies";
import useSWR from "swr";
import { fetcher } from "@/components/UploadShad/FileInputUtils";

export default function LocationSection({ property }: { property: PropertyWithAddress }) {
  const { data } = useSWR<PropertyWithAddress[]>("/api/properties", fetcher);

  return (
    <section className="flex justify-center items-center w-full flex-col">
      <div className="border-t border-b border-[#dddddd] flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"></h3>
        <div className="w-full mb-8 min-h-[40vw]">
          <MapComp height="40vw" focusedProperty={property} properties={data || []} />
        </div>
      </div>
    </section>
  );
}
