import { buttonVariants } from "@/components/ui/button";
import Properties from "./_components/Properties";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function ViewProperties() {
  // Auth user via Clerk & in Dashboard
  // Track via Posthog & set role

  return (
    <div className="w-full flex justify-start items-center gap-10  pb-20  my-5 flex-col px-3 sm:px-5 min-h-screen  ">
      <div className="flex w-full justify-between items-center sm:px-5 lg:max-w-7xl ">
        <p className="scroll-m-20 text- sm:text-lg font-semibold tracking-tight">
          Your Properties
        </p>
        <Link
          href="/dashboard/property/create"
          className={buttonVariants({
            variant: "outline",
            className: "gap-2",
            size: "sm",
          })}
        >
          <PlusCircle size={16} />
          Add Property
        </Link>
      </div>

      <div className="w-full sm:px-5 lg:max-w-7xl ">
        <Properties />
      </div>
    </div>
  );
}