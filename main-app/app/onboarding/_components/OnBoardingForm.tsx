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
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { RoleRequest } from "@/app/api/[[...route]]/userController";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

const propertySchema = z.object({
  role: z.string(),
  clerkId: z.string(),
  publicUsername: z.string(),
  about: z.string(),
});

async function sendRequest(
  url: string,
  { arg }: { arg: { userId: string; role: "viewer" | "agent" } }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export default function OnBoardingForm({
  userId,
  firstName,
}: {
  userId: string;
  firstName: string | null;
}) {
  const [isAgent, setIsAgent] = useState(false);
  const { trigger, isMutating, data } = useSWRMutation(
    "/api/user/updateRole",
    sendRequest /* options */
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
      <CustomerOrAgentSelect
        onChange={async () => {
          try {
            await trigger({ userId: userId, role: "agent" } /* options */);
            toast({
              title: "Thanks for joining!",
              description: (
                <Link href="/dashboard">Checkout your Dashboard</Link>
              ),
              duration: 20000,
            });
          } catch (e) {
            // error handling
            toast({
              title: "Something unexpected happened.",
              description: "Please try again...",
              duration: 10000,
            });
          }
        }}
      />
    </div>
  );
}

function CustomerOrAgentSelect({ onChange }: { onChange: () => void }) {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center gap-4 flex-col w-full sm:flex-row sm:max-w-3xl lg:max-w-5xl">
      <Card
        className={cn(
          "min-w-sm flex w-full justify-center items-center flex-col text-center px-4 py-4 gap-5 h-52"
        )}
        onClick={() => router.push("/")}
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
        onClick={onChange}
      >
        <p>Icon of an Agent/House</p>
        <CardTitle>Agent</CardTitle>
        <CardDescription>Post Properties for free...</CardDescription>
      </Card>
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
