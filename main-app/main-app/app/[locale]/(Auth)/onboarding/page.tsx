import { currentUser } from "@clerk/nextjs/server";
import OnboardingForm from "./(components)/OnboardingForm";
import { SignInButton } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import SuccessCard from "./(components)/SuccessCard";

// Allow user to navigate with just Clerk auth
// Auto-create user with default values on restricted actions

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const t = await getTranslations("Onboarding");
  const user = await currentUser();

  return (
    <div className="bg-background flex justify-center items-center flex-col px-4 pt-14 pb-28 w-full gap-8">
      <div className="flex justify-center items-center flex-col w-full gap-1">
        <h1 className="text-center text-3xl">
          {user
            ? `${t("greeting.welcome")} ${user.firstName} ${user.lastName} 👋`
            : `${t("greeting.welcome")}!`}
        </h1>

        <h2 className="mt-4 text-center text-base text-muted-foreground">
          {t("greeting.subHeading")}
        </h2>
      </div>
      {user && searchParams?.registered === "true" && <SuccessCard />}
      {user && searchParams?.registered !== "true" && (
        <OnboardingForm
          userId={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          number={user.primaryPhoneNumber?.phoneNumber}
          email={user.primaryEmailAddress?.emailAddress}
        />
      )}
      {!user && searchParams?.registered !== "true" && (
        <Card className="w-fu  shadow-lg px-2">
          <CardHeader className="flex justify-center items-center">
            <CardTitle>{t("unAuthed.title")}</CardTitle>
            <CardDescription>{t("unAuthed.subHeading")}</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton
              forceRedirectUrl={"/onboarding"}
              signUpForceRedirectUrl={"/onboarding"}
              fallbackRedirectUrl={"/onboarding"}
              signUpFallbackRedirectUrl={"/onboarding"}
            >
              <p
                id="SignInBtn"
                className="text-base text-white bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded min-w-[100px] text-center cursor-pointer"
              >
                {t("unAuthed.button")}
              </p>
            </SignInButton>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
