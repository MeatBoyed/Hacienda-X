// Tremor for Analytics Components - https://www.tremor.so/

import { LeadsCard, PropertyListCard } from "./(components)/DashboardCards";
import { getPropertiesForAgent } from "@/lib/RequestService";
import Head from "./(components)/Head";
import { Lead } from "@prisma/client";
import Insights from "./(components)/Insights";

export default async function DashboardPage() {
  const response = await getPropertiesForAgent();
  const leads: Lead[] = [];

  return (
    <div className="min-h-screen p-8 bg-gray-50 mt-16">
      <main className="max-w-6xl mx-auto">
        <Head />
        <Insights />
        <div className="grid gap-6 md:grid-cols-2 w-full">
          <LeadsCard leads={leads} />
          <PropertyListCard properties={response ? response.properties : undefined} />
        </div>
      </main>
    </div>
  );
}
