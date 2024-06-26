import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewLeads from "./_components/NewLeads";
import Properties from "./property/_components/Properties";

// Tremor for Analytics Components - https://www.tremor.so/

export default function Dashboard() {
  // Auth user via Clerk & in Dashboard
  // Track via Posthog & set role

  return (
    <div className="w-full flex justify-center items-center pb-20 md:px-10 lg:px-10 xl:px-32 my-10 px-4">
      <section className="w-full flex justify-center flex-col-reverse md:flex-row md:justify-between gap-10 md:gap-16 items-start">
        {/* Left Side */}
        <div className="flex justify-center items-start flex-col gap-5 w-full">
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Properties
          </p>
          <Properties className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5" />
        </div>

        <div className="border w-full border-gray-600 md:hidden" />

        {/* Right */}
        <div className="w-full flex justify-center items-start gap-5 flex-col">
          <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Overview
          </p>
          <LeadInsightCard />
          <NewLeads />
        </div>
      </section>
    </div>
  );
}

function LeadInsightCard() {
  const views = 3500;
  return (
    <Card className="flex justify-center items-center w-full">
      <CardHeader className="sm:gap-2 justify-center items-center">
        <CardTitle className="text-2xl sm:text-4xl">
          {views.toLocaleString()}
        </CardTitle>
        <CardDescription>Unread</CardDescription>
      </CardHeader>
      <CardHeader className="sm:gap-2 justify-center items-center">
        <CardTitle className="text-2xl sm:text-4xl">
          {views.toLocaleString()}
        </CardTitle>
        <CardDescription>Open</CardDescription>
      </CardHeader>
      <CardHeader className="sm:gap-2 justify-center items-center">
        <CardTitle className="text-2xl sm:text-4xl">
          {views.toLocaleString()}
        </CardTitle>
        <CardDescription>Closed</CardDescription>
      </CardHeader>
    </Card>
  );
}
