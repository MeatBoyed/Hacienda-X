"use client";
import { Button } from "@/components/ui/button";
import { SavePropertyBTN } from "@/lib/bookmarksContext";
import { PropertyWithAddress } from "@/Server/utils/utils";
import data from "@/Utils/accordion";
import { ChevronLeft, Share } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionButtons({ data }: { data: PropertyWithAddress }) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center z-50 border-t bg-white py-4 px-4 w-full fixed top-0 shadow-sm sm:hidden">
      <Button onClick={() => router.back()} className="text-text bg-transparent gap-1 p-0">
        <ChevronLeft size={15} /> Back
      </Button>

      <div className="flex justify-center items-center">
        <Button size="icon" className="text-text p-0">
          <Share size={15} />
        </Button>
        <SavePropertyBTN property={data} />
      </div>
    </div>
  );
}
