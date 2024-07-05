"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/components/ImagesInput/FileInputUtils";
import { Lead } from "@prisma/client";
import { ChevronRight, Copy } from "lucide-react";
import { useMemo } from "react";
import useSWR from "swr";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function NewLeads() {
  const { data, error, isLoading } = useSWR<{
    leads: Lead[];
    properties: string[];
  }>("/api/leads/", fetcher);

  const leads = useMemo(
    () =>
      data && data.leads.length > 0 ? (
        data.leads.map((lead, index) => (
          <LeadCard
            lead={lead}
            propertyTitle={data.properties[index]}
            key={index}
          />
        ))
      ) : (
        <p>You have no properties. Let&#39;s go add one!</p>
      ),
    [data]
  );

  return (
    <div className=" w-full">
      <p className="text-base text-muted-foreground">View all your leads.</p>

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

function LeadCard({
  lead,
  propertyTitle,
}: {
  lead: Lead;
  propertyTitle: string;
}) {
  function handleCopy(head: string, text: string) {
    navigator.clipboard.writeText(text);
    toast.success(`Customer's ${head} has been copied to your clipboard.`);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-4 border-b pb-4 w-full hover:cursor-pointer">
          <div className="grid gap-1 w-full">
            <p className="text-sm font-medium leading-none">{lead.name} </p>
            <p className="text-sm text-muted-foreground">{lead.message}</p>
          </div>
          <ChevronRight size={16} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md space-y-4">
        <DialogHeader>
          <DialogTitle>Your Lead for {propertyTitle}</DialogTitle>
          <DialogDescription>
            Use these details to contact the customer and close your deal.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex justify-center items-start flex-col gap-5">
          <div className="w-full flex justify-center items-center gap-4">
            <div className="flex justify-center items-start flex-col gap-3 w-full">
              <Label>Name</Label>
              <Input
                disabled
                type="text"
                value={lead.name}
                className="disabled:opacity-100"
              />
            </div>
            <div className="flex justify-center items-start gap-3 flex-col w-full">
              <Label>Surname</Label>
              <Input
                disabled
                type="text"
                value={lead.surname}
                className="disabled:opacity-100"
              />
            </div>
          </div>
          <div className="flex justify-center items-start flex-col gap-3 w-full">
            <Label>Email</Label>
            <div className="w-full flex justify-center items-center gap-3">
              <Input
                disabled
                type="text"
                value={lead.email}
                className="disabled:opacity-100"
              />
              <Button
                size="sm"
                className="px-3"
                variant={"outline"}
                onClick={() => handleCopy("Email", lead.email)}
              >
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" color="black" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-start flex-col gap-3 w-full">
            <Label>Phone number</Label>
            <div className="w-full flex justify-center items-center gap-3">
              <Input
                disabled
                type="text"
                value={lead.phoneNumber}
                className="disabled:opacity-100"
              />
              <Button
                size="sm"
                className="px-3"
                variant={"outline"}
                onClick={() => handleCopy("Phone number", lead.phoneNumber)}
              >
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" color="black" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-start gap-3 flex-col w-full">
            <Label>Message</Label>
            <Textarea
              disabled
              value={lead.message}
              className="disabled:opacity-100"
            />
          </div>
          <DialogFooter className="sm:justify-start w-full">
            <DialogClose asChild>
              <Button type="button" className="w-full" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LeadCardSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b pb-4 w-full">
      <div className="grid gap-3 w-full">
        <Skeleton className="w-full h-5 rounded-xl" />
        <Skeleton className="w-full h-5 rounded-xl" />
      </div>
    </div>
  );
}
