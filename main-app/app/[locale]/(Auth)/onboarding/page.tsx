import { currentUser } from "@clerk/nextjs/server";
import RegisterForm from "./_components/RegisterForm";
import { SignInButton } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

// Allow user to navigate with just Clerk auth
// Auto-create user with default values on restricted actions

export default async function Onboarding() {
  const t = await getTranslations("Onboarding");
  const user = await currentUser();

  return (
    <div className="bg-background flex justify-center items-center flex-col px-4 pt-14 pb-28 w-full gap-8">
      <div className="flex justify-center items-center flex-col w-full gap-1">
        <h1 className="text-center text-3xl">
          {user ? `${t("greeting.welcome")} ${user.firstName} ${user.lastName} 👋` : `${t("greeting.welcome")}!`}
        </h1>

        <h2 className="mt-4 text-center text-base text-muted-foreground">{t("greeting.subHeading")}</h2>
      </div>
      {user ? (
        <RegisterForm
          userId={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.primaryEmailAddress?.emailAddress}
        />
      ) : (
        <Card>
          <CardHeader className="flex justify-center items-center">
            <CardTitle>{t("unAuthed.title")}</CardTitle>
            <CardDescription>{t("unAuthed.subHeading")}</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton mode="modal" forceRedirectUrl={"/onboarding"}>
              <p className="text-base text-white bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded min-w-[100px] text-center cursor-pointer">
                {/* TODO: Should be Get Started and go to /pricing  */}
                {t("unAuthed.button")}
              </p>
            </SignInButton>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
