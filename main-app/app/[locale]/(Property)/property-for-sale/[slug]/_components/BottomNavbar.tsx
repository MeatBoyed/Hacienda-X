import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function BottomNavbar({ price }: { price: number }) {
  return (
    <div className="flex justify-between items-center z-50 border-t bg-background py-5 px-4 w-full fixed bottom-0 sm:hidden">
      <p className="text-xl text-text font-semibold">
        R {price?.toLocaleString()}
      </p>
      <Link
        href={"#LeadForm"}
        className="bg-blue-500 rounded-md px-2 py-1 font-normal text-white"
      >
        Enquire Now
      </Link>
    </div>
  );
}