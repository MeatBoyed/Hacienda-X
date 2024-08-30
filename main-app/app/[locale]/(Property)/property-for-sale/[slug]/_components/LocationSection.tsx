import { MapComp } from "@/components/Map";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { getProperties } from "@/lib/RequestService";

export default async function LocationSection({ property }: { property: PropertyWithAddress }) {
  const data = await getProperties();

  if (!data) return <></>;

  return (
    <section className="flex justify-center items-center w-full flex-col">
      <div className="border-t border-b border-[#dddddd] flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"></h3>
        <div className="w-full mb-8 min-h-[40vw]">
          <MapComp height="40vw" focusedProperty={property} properties={data.properties || []} />
        </div>
      </div>
    </section>
  );
}
