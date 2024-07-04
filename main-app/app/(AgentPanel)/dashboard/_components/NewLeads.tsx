"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/components/ImagesInput/FileInputUtils";
import { Lead } from "@prisma/client";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import useSWR from "swr";

export default function NewLeads() {
  const { data, error, isLoading } = useSWR<Lead[]>("/api/leads/", fetcher);

  const leads = useMemo(
    () =>
      data && data.length > 0 ? (
        data.map((lead, index) => <LeadCard lead={lead} key={index} />)
      ) : (
        <p>You have no properties. Let&#39;s go add one!</p>
      ),
    [data]
  );

  return (
    <div className=" w-full">
      <p className="text-base text-muted-foreground">You have 30 new leads</p>

      <div className="mt-10 w-full flex justify-center items-center gap-4 flex-col">
        {/* {leads} */}
        {data && !isLoading && !error && <>{leads}</>}
        {isLoading && !error && (
          <>
            <LeadCardSkeleton />
            <LeadCardSkeleton />
            <LeadCardSkeleton />
          </>
        )}
      </div>
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="flex items-center gap-4 border-b pb-4 w-full">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="grid gap-1 w-full">
        <p className="text-sm font-medium leading-none">{lead.name} </p>
        <p className="text-sm text-muted-foreground">{lead.message}</p>
      </div>
      <ChevronRight size={16} />
    </div>
  );
}

function LeadCardSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b pb-4 w-full">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="grid gap-3 w-full">
        <Skeleton className="w-full h-5 rounded-xl" />
        <Skeleton className="w-full h-5 rounded-xl" />
      </div>
    </div>
  );
}
