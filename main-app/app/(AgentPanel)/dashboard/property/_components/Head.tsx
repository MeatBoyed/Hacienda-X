import { Button } from "@/components/ui/button";
import { ChevronLeft, Badge, Eye } from "lucide-react";

export default function Head() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex justify-center items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7 bg-white">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Create Property
        </h1>
        <div className="border h-8 px-2 py-2 flex justify-center items-center gap-3 rounded-md">
          <Eye size={20} />
          <p className="text-sm font-medium">Public</p>
        </div>
      </div>
      <div className="hidden items-center gap-2 md:ml-auto md:flex ">
        <Button variant="destructive" size="sm">
          Discard
        </Button>
        <Button size="sm" className="hidden">
          Save Product
        </Button>
      </div>
    </div>
  );
}
