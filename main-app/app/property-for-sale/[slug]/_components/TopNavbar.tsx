import { Button } from "@/components/ui/button";
import { ChevronLeft, Heart, Share } from "lucide-react";

export default function TopNavbar() {
  return (
    <div className="flex justify-between items-center z-50 border-t bg-background py-4 px-4 w-full fixed top-0 sm:hidden">
      <Button className="text-text bg-transparent gap-1 p-0 ">
        <ChevronLeft size={15} /> Back
      </Button>

      <div className="flex justify-center items-center">
        <Button size="icon" className="text-text p-0">
          <Share size={15} />
        </Button>
        <Button size="icon" className="text-text p-0">
          <Heart size={15} />
        </Button>
      </div>
    </div>
  );
}
