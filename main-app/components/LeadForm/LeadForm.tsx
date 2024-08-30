"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { LeadFormContextProvider } from "@/components/LeadForm/LeadFormContext";
import { LeadFormBody } from "@/components/LeadForm/LeadFormBody";

export default function LeadForm({ propertyId, agentId }: { propertyId: string; agentId: string }) {
  const t = useTranslations();

  return (
    <Card id="LeadForm" className="w-full min-h-[50vh] sm:w-[70%] shadow-lg px-2">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>{t("propertyform.contactAgent")}</CardTitle>
        <CardDescription>{t("propertyform.agentDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <LeadFormContextProvider agentId={agentId} propertyId={propertyId}>
          <LeadFormBody />
          <h1>Hello</h1>
        </LeadFormContextProvider>
      </CardContent>
    </Card>
  );
}
