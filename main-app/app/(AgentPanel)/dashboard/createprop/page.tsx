import PropertyForm from "./_components/PropertyForm";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { z } from "zod";
import { PropertySchema } from "./_components/FormUtils";
import usePropertyForm from "./_components/usePropertyForm";

// Allow user's to request property features for us to add

export default async function CreatePropertyPage() {
  return (
    <section
      id="createpropertyform"
      className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full my-10 pb-40 "
    >
      <div className="mx-auto grid lg:max-w-8xl flex-1 w-full auto-rows-max gap-4">
        {/* <Head /> */}
        {/* <CreateProperty /> */}
        <PropertyForm />
      </div>
    </section>
  );
}
