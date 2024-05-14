import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, TrendingUp } from "lucide-react";
import NewLeads from "./_components/NewLeads";
import PropertyInsightCard from "./_components/PropertyInsightCard";
import InsightCard from "./_components/InsightCard";

// Tremor for Analytics Components - https://www.tremor.so/

export default function Dashboard() {
  // Auth user via Clerk & in Dashboard
  // Track via Posthog & set role
  return (
    <div className="w-full flex justify-start items-start gap-5 pb-20  my-10 flex-col h-[100vh]">
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Overview
      </p>

      <section className="w-full flex justify-between items-start ">
        {/* Left Side */}
        <div className="flex justify-center items-start flex-col">
          <div className=" flex justify-center items-center gap-4">
            <InsightCard />
            {/* <InsightCard />
            <InsightCard /> */}
          </div>

          <div className="w-full h-[40vh] bg-gray-600 mt-10 rounded-lg" />
        </div>

        {/* Right */}
        <div className="">
          <LeadInsightCard />
          <NewLeads />
        </div>
      </section>

      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Your properties
      </p>
      <div className="flex justify-center items-center gap-4">
        <PropertyInsightCard />
        <PropertyInsightCard />
        <PropertyInsightCard />
      </div>
    </div>
  );
}

function LeadInsightCard() {
  const views = 3500;
  return (
    <Card className="flex justify-center items-center">
      <CardHeader className="gap-2 justify-center items-center">
        <CardTitle className="text-4xl">{views.toLocaleString()}</CardTitle>
        <CardDescription>Unread</CardDescription>
      </CardHeader>
      <CardHeader className="gap-2 justify-center items-center">
        <CardTitle className="text-4xl">{views.toLocaleString()}</CardTitle>
        <CardDescription>Open</CardDescription>
      </CardHeader>
      <CardHeader className="gap-2 justify-center items-center">
        <CardTitle className="text-4xl">{views.toLocaleString()}</CardTitle>
        <CardDescription>Closed</CardDescription>
      </CardHeader>
    </Card>
  );
}
