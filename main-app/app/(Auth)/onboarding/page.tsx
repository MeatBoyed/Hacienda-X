import { currentUser } from "@clerk/nextjs/server";
import RegisterForm from "@/app/(Core)/_components/RegisterForm";
import { SignInButton } from "@clerk/nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Toaster } from "sonner";

// Allow user to navigate with just Clerk auth
// Auto-create user with default values on restricted actions

export default async function Onboarding() {
  const user = await currentUser();

  return (
    <div className="bg-background flex justify-center items-center flex-col px-4 pt-14 pb-28 w-full gap-8">
      <div className="flex justify-center items-center flex-col w-full gap-1">
        <h1 className="text-center text-3xl">
          {user
            ? `Welcome ${user.firstName} ${user.lastName} 👋`
            : "Welcome! Daniel come fix this please"}
        </h1>

        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let&apos;s get started by setting up your account.
        </h2>
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
            <CardTitle>First, let's create your account</CardTitle>
            <CardDescription>Our agents are here to assist you</CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton mode="modal" forceRedirectUrl={"/onboarding"}>
              <p className="text-base text-white bg-blue-500 hover:bg-blue-700 transition px-4 py-2 rounded min-w-[100px] text-center cursor-pointer">
                {/* TODO: Should be Get Started and go to /pricing  */}
                Sign In
              </p>
            </SignInButton>
          </CardContent>
        </Card>
      )}
      <Toaster richColors />
    </div>
  );
}
