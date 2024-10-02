// Tremor for Analytics Components - https://www.tremor.so/
import { LeadsCard, PropertyListCard } from "./(components)/DashboardCards";
import Head from "./(components)/Head";
import Insights from "./(components)/Insights";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUsersDashboard } from "./property/actions";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const response = await getUsersDashboard(user.id);

  return (
    <div className="min-h-screen p-8 bg-gray-50 mt-16">
      <main className="max-w-6xl mx-auto">
        <Head />
        {response.leads && response.properties && (
          <Insights
            insights={{
              totalValue: response.totalValue,
              activeLeads: response.leads.length,
              totalListings: response.properties.length,
            }}
          />
        )}
        <div className="grid gap-6 md:grid-cols-2 w-full">
          <LeadsCard leads={response?.leads} />
          <PropertyListCard properties={response?.properties} />
        </div>
      </main>
    </div>
  );
}
