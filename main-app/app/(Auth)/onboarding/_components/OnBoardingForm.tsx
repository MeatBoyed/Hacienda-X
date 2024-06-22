"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, fetcher } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { RoleRequest } from "@/app/api/(controllers)/userController";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { SelectUserResponse } from "@/app/api/(utils)/utils";
import useSWR from "swr";
import { PuffLoader } from "react-spinners";
import { $Enums } from "@prisma/client";
import PostHogClient from "@/components/Posthog";

const propertySchema = z.object({
  role: z.string(),
  clerkId: z.string(),
  publicUsername: z.string(),
  about: z.string(),
});

async function sendRequest(
  url: string,
  { arg }: { arg: { role: "viewer" | "agent" } }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

// TODO: Highlight what role the user current is
export default function OnBoardingForm({
  userId,
  firstName,
}: {
  userId: string;
  firstName: string | null;
}) {
  // Check if User is in DB, if they are - show selected option
  const { data, isLoading } = useSWR<SelectUserResponse>(
    `/api/user/${userId}`,
    fetcher,
    {
      // Ensure request is only made 1
      revalidateOnFocus: true,
      revalidateOnMount: false,
      revalidateOnReconnect: true,
      refreshWhenOffline: true,
      refreshWhenHidden: false,
      refreshInterval: 0,
      onError: () => {
        // Implies user is new, so welcome them
        toast({
          title: "Welcome! We are glad you joined.",
          description: "Get started by telling us about yourself.",
        });
      },
      onSuccess: () => {
        toast({
          title: "Hey there! Lets finish up",
          description: "Get started by telling us about yourself.",
        });
      },
    }
  );

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <div className="flex justify-center items-center flex-col w-full gap-2">
        <h1 className="text-center text-3xl">
          Welcome
          {firstName && <span className="font-bold">, {firstName}!</span>} 👋
        </h1>

        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let &apos;s get started by setting up your account.
        </h2>

        <h3 className="mt-1 text-center text-sm text-muted-foreground">
          You can change these settings at any time
        </h3>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center w-full py-20">
          <div className="wrapper flexCenter" style={{ height: "60vh" }}>
            <PuffLoader
              //   height={80}
              //   width="80"
              //   radius={1}
              color="#4066ff"
              aria-label="puff-loading"
            />
          </div>
        </div>
      )}
      {!isLoading && (
        <CustomerOrAgentSelect isCreated={data?.results} userId={userId} />
      )}
    </div>
  );
}

function CustomerOrAgentSelect({
  isCreated,
  userId,
}: {
  isCreated?: $Enums.Role;
  userId: string;
}) {
  const router = useRouter();
  const [role, setRole] = useState<$Enums.Role | undefined>(isCreated);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    link: string;
  } | null>();

  const { trigger, isMutating, data } = useSWRMutation(
    "/api/user/updateRole",
    sendRequest /* options */,
    {
      onError: () => {
        toast({
          title: "Something unexpected happened.",
          description: "Please try again...",
          duration: 10000,
        });
      },

      onSuccess: () => {
        // Identify User Role
        const posthog = PostHogClient();
        posthog.identify({
          distinctId: userId, // replace with a user's distinct ID
          properties: { role: role },
        });

        // Show message
        toast({
          title: "Thanks for joining!",
          description: (
            <Link href={toastMessage?.link || ""}>
              {toastMessage?.message || ""}
            </Link>
          ),
          duration: 20000,
        });
      },
    }
  );

  return (
    <div className="flex justify-center items-center gap-4 flex-col w-full sm:flex-row sm:max-w-3xl lg:max-w-5xl">
      {isMutating && (
        <div className="flex justify-center items-center w-full py-20">
          <div className="wrapper flexCenter" style={{ height: "60vh" }}>
            <PuffLoader
              //   height={80}
              //   width="80"
              //   radius={1}
              color="#4066ff"
              aria-label="puff-loading"
            />
          </div>
        </div>
      )}
      {!isMutating && (
        <>
          <Card
            className={cn(
              "min-w-sm flex w-full justify-center items-center flex-col text-center px-4 py-4 gap-5 h-52"
            )}
            onClick={async () => {
              setToastMessage({
                message: "Checkout properties in your area",
                link: "/properties-for-sale",
              });
              await trigger({ role: "viewer" });
              setRole("viewer");
              // router.push("/")
            }}
          >
            <p>Icon of an Viewer</p>
            <CardTitle>Customer</CardTitle>
            <CardDescription>
              View properties in your area, and make enquires...
            </CardDescription>
          </Card>
          <Card
            className={cn(
              "min-w-sm flex w-full justify-center items-center flex-col text-center px-4 py-4 gap-5 hover:cursor-pointer h-52"
            )}
            onClick={async () => {
              setToastMessage({
                message: "Checkout your dashboard",
                link: "/dashboard",
              });
              await trigger({ role: "agent" } /* options */);
              setRole("agent");
            }}
          >
            <p>Icon of an Agent/House</p>
            <CardTitle>Agent</CardTitle>
            <CardDescription>Post Properties for free...</CardDescription>
          </Card>
        </>
      )}
    </div>
  );
}

function OnboardingForm() {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      role: "",
      clerkId: "",
      publicUsername: "",
      about: "",
    },
  });

  function onSubmit(values: z.infer<typeof propertySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-col w-full py-10"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Role" {...field} />
                  </FormControl>
                  <FormDescription>Enter Your Role</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Public Username" {...field} />
                  </FormControl>
                  <FormDescription>Enter Your Public Username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Input placeholder="About" {...field} />
                  </FormControl>
                  <FormDescription>Enter the About</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
