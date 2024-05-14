import { Button } from "@/components/ui/button";
import { ChevronLeft, Badge, Eye } from "lucide-react";

export default function Head() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex justify-center items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Create Property
        </h1>
        <Badge className="gap-3 text-xs w-full rounded-sm">
          <Eye size={16} />
          Public
        </Badge>
      </div>
      <div className="hidden items-center gap-2 md:ml-auto md:flex ">
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button size="sm" className="hidden">
          Save Product
        </Button>
      </div>
    </div>
  );
}
