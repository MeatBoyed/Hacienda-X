import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { LeadFormContextProvider } from "@/components/LeadForm/LeadFormContext";
import { LeadFormBody } from "@/components/LeadForm/LeadFormBody";
import { getTranslations } from "next-intl/server";

export default async function LeadForm({
  propertyId,
  agentId,
}: {
  propertyId: string;
  agentId: string;
}) {
  const t = await getTranslations();

  return (
    <LeadFormContextProvider agentId={agentId} propertyId={propertyId}>
      <Card id="LeadForm" className="w-full min-h-full shadow-lg px-2">
        <CardHeader className="flex justify-center items-center">
          <CardTitle>{t("propertyform.contactAgent")}</CardTitle>
          <CardDescription>{t("propertyform.agentDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadFormBody />
        </CardContent>
      </Card>
    </LeadFormContextProvider>
  );
}
