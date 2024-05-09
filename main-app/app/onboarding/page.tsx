import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import OnBoardingForm from "./_components/OnBoardingForm";

  // Allow user to navigate with just Clerk auth
  // Auto-create user with default values on restricted actions

export default async function Onboarding() {
  const user = await currentUser();

  if (!user || user === null) {
    redirect("/sign-up");
  }

  return (
    <div className="bg-background flex justify-center items-center flex-col px-4 py-28 w-full">
      <OnBoardingForm userId={user.id} firstName={user.firstName} />
    </div>
  );
}
