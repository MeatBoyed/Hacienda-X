import { MapViewer } from "@/components/Map";
import { Button } from "@/components/ui/button";

export default function LocationSection() {
  return (
    <section className="flex justify-center items-center w-full flex-col">
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Where it is
        </h3>
        <div className="w-full h-32 bg-black rounded-lg" />
        {/* <MapViewer classname="h-30vh" properties={} /> */}
        <Button variant="link" className="text-text ">
          Find properties in this area
        </Button>
      </div>
    </section>
  );
}
