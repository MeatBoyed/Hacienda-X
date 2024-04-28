import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bath, Bed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PropertyDetails({
  description,
  bathrooms,
  bedrooms,
}: {
  description?: string;
  bathrooms?: number;
  bedrooms?: number;
}) {
  return (
    <section
      id="propertyDetails"
      className="flex justify-center items-center flex-col w-full py-10"
    >
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <p className="text-sm">
          Climb – Hike – Bike – Fish – Relax...Tegwaan is the perfect place to
          stay if you want access to a lot of fun outdoor activities while
          staying in a comfortable place! Immersed in nature, Tegwaan is a
          little ecosystem of its own: with fresh water springs, several fish
          ponds and a creek, the grass is always green, the trees are tall and
          the birds are happy! :-). The Studio is a big open plan room, ideal
          for couples or families who want a bit more space than a tiny house.
        </p>
        <Button className="text-text p-0" variant={"link"}>
          See More <ChevronRight size={15} />
        </Button>
      </div>
      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          What this place offers
        </h3>

        <OffersList bathrooms={bathrooms} bedrooms={bedrooms} />
      </div>

      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Where it is
        </h3>
        <div className="w-full h-32 bg-black rounded-lg" />
        <Button variant="link" className="text-text ">
          Find properties in this area
        </Button>
      </div>

      <div className="border-t border-b border-[#dddddd] py-5 flex justify-center items-start flex-col w-full gap-5">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Meet your agent
        </h3>

        <div className="flex justify-center items-start flex-row gap-5">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex justify-center items-start gap-2 flex-col">
            <p className="text-sm font-semibold leading-none">
              Hughie Cameltoe'
            </p>
            <p className="leading-7 text-xs">Card Description</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OffersList({
  bathrooms,
  bedrooms,
}: {
  bathrooms?: number;
  bedrooms?: number;
}) {
  return (
    <div className="flex justify-center items-start flex-col w-full gap-3">
      <div className="flex justify-center items-center gap-5">
        <Bed size={20} />
        <p className="leading-7">{bedrooms} Bedrooms</p>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Bath size={20} />
        <p className="leading-7">{bathrooms} Bathrooms</p>
      </div>
    </div>
  );
}
