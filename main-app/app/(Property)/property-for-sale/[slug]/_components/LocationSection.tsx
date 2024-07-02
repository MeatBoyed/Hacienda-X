import { MapComp } from "@/components/Map";
import { PropertyWithAddress } from "@/Server/utils/utils";
import Residencies from "@/app/_components/Residencies";

export default function LocationSection({
  property,
}: {
  property: PropertyWithAddress;
}) {
  return (
    <section className="flex justify-center items-center w-full flex-col">
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"></h3>
        <div className="w-full mb-8 min-h-[40vw]">
          <MapComp height="40vw" focusedProperty={property} properties={[]} />
        </div>
        <Residencies
          subHeading="Related properties"
          heading="Properties"
          className="px-1"
        />
        {/* <Button variant="link" className="text-text ">
          Find properties in this area
        </Button> */}
      </div>
    </section>
  );
}
