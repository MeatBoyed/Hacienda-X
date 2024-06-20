import { buttonVariants } from "@/components/ui/button";
import Properties from "./_components/Properties";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function ViewProperties() {
  // Auth user via Clerk & in Dashboard
  // Track via Posthog & set role

  return (
    <div className="w-full flex justify-center items-start gap-10  pb-20  my-10 flex-col max-w-6xl">
      <div className="flex w-full justify-between items-center ">
        <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Your Properties
        </p>
        <Link
          href="/dashboard/property/create"
          className={buttonVariants({ variant: "outline", className: "gap-2" })}
        >
          <PlusCircle size={16} />
          Add Property
        </Link>
      </div>

      <Properties />
    </div>
  );
}
