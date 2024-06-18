import Properties from "./_components/Properties";

export default function ViewProperties() {
  // Auth user via Clerk & in Dashboard
  // Track via Posthog & set role

  return (
    <div className="w-full flex justify-start items-start gap-5 pb-20  my-10 flex-col h-[100vh]">
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Your properties
      </p>
      <Properties />
    </div>
  );
}
