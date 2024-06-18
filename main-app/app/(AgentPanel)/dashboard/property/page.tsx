import PropertyInsightCard from "../_components/PropertyInsightCard";

export default function Dashboard() {
  // Auth user via Clerk & in Dashboard
  // Track via Posthog & set role
  return (
    <div className="w-full flex justify-start items-start gap-5 pb-20  my-10 flex-col h-[100vh]">
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Your properties
      </p>

      {/* <div className="flex justify-center items-center gap-4"> */}
      <div className="grid gap-4 lg:grid-cols-4">
        <PropertyInsightCard />
        <PropertyInsightCard />
        <PropertyInsightCard />
      </div>
    </div>
  );
}
