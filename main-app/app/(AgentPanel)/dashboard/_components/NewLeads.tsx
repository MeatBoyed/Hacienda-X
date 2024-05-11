import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

// Turn into a Card??

export default function NewLeads() {
  return (
    <div className="mt-10">
      <div className="flex flex-col items-start ">
        <p className="scroll-m-20 text-xl font-semibold tracking-tight">
          New Leads
        </p>
        <p className="text-base text-muted-foreground">You have 30 new leads</p>
      </div>

      <div className="mt-10 w-full flex justify-center items-center gap-4 flex-col">
        <Lead />
        <Lead />
        <Lead />
      </div>
    </div>
  );
}

function Lead() {
  return (
    <div className="flex items-center gap-4 border-b pb-4 w-full">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 w-full">
        <p className="text-sm font-medium leading-none">Olivia Martin</p>
        <p className="text-sm text-muted-foreground">
          Hey there! When can I view the property?
        </p>
      </div>
      <ChevronRight size={16} />
    </div>
  );
}
