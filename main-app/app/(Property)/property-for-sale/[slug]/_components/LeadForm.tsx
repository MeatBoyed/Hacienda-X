// This is part of the Core Business Logic
// DO NOT Change & Push this file without Proper testing
// Failure to do so will lead to a reduction in Equity

// Every User who wishes to contact the Agent, must have an account

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { PhoneInput } from "@/components/PhoneInput";
import useSWRMutation from "swr/mutation";
import { PostLead } from "@/lib/RequestUtils";
import Loader from "@/components/ui/loader";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useUser } from "@clerk/nextjs";

// Lead Form UTILS
export const LeadFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  surname: z
    .string()
    .min(3, { message: "Surname must be at least 3 characters long." }),
  email: z.string().email({ message: "Email address must be valid." }),
  message: z.string().min(10, {
    message: "Please enter a short message, longer than 10 characters.",
  }),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  propertyId: z.string().min(3, { message: "Property Id is required" }),
  agentId: z.string().min(3, { message: "Agent Id is required" }),
});

export default function LeadForm({
  propertyId,
  agentId,
}: {
  propertyId: string;
  agentId: string;
}) {
  const user = useUser();
  const form = useForm<z.infer<typeof LeadFormSchema>>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      name: user.user?.firstName || "",
      email: user.user?.primaryEmailAddress?.emailAddress || "",
      surname: user.user?.lastName || "",
      agentId: agentId,
      propertyId: propertyId,
      message: "I'm interested in this property, please contact me.",
    },
  });

  const { trigger: triggerCreate, isMutating: isMutatingCreate } =
    useSWRMutation("/api/leads/create", PostLead /* options */, {
      onError: (error) => {
        console.log("Received Error (Plain): ", error);
        toast.error("Something unexpected happend.", {
          description: "Please try again....",
        });
      },
      onSuccess: (data) => {
        // Show message
        console.log(data);
        toast.success("Your lead has been posted!", {
          description: `Thank you for enquirying. We will be reaching out soon.`,
          duration: 10000,
        });
      },
    });

  function onSubmit(values: z.infer<typeof LeadFormSchema>) {
    console.log(values);
    triggerCreate({ lead: values });
  }

  return (
    <Card id="LeadForm" className="w-full sm:w-[70%] shadow-lg px-2">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Contact Agent</CardTitle>
        <CardDescription>Our agents are here to assist you</CardDescription>
      </CardHeader>
      <CardContent>
        {isMutatingCreate ? (
          <Loader className="h-[30vh]" />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex justify-center items-center gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Your surname"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        placeholder="Enter a phone number"
                        {...field}
                        defaultCountry="ZA"
                        international
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="I'm interested in this property, please contact me."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-white bg-accent w-full">
                Submit
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
