// This is part of the Core Business Logic
// DO NOT Change & Push this file without Proper testing
// Failure to do so will lead to a reduction in Equity
"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import Loader from "@/components/ui/loader";
import { useUser } from "@clerk/nextjs";
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/PhoneInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostAgent } from "@/app/api/(userActions)/actions";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { RoleEnum } from "@/Server/controllers/userController";
import { Switch } from "@/components/ui/switch";

// Lead Form UTILS
export const UserFormSchema = z.object({
  firstName: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  lastName: z.string().min(3, { message: "Surname must be at least 3 characters long." }),
  email: z.string().email({ message: "Email address must be valid." }),
  company: z.string().optional(),
  phoneNumber: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }).optional(),
  user_id: z.string().min(1, { message: "User Id is required" }),
  isAgent: z.boolean(),
});

export default function RegisterForm({
  userId,
  firstName,
  lastName,
  email,
}: {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email?: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      user_id: userId,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      isAgent: false,
    },
  });

  const { trigger: triggerCreate, isMutating: isMutatingCreate } = useSWRMutation(
    "post-agent",
    PostAgent({ json: form.getValues() }) /* options */,
    {
      onError: (error) => {
        console.log("Received Error (Plain): ", error);
        toast.error("Something unexpected happend.", {
          description: "Please try again....",
        });
      },
      onSuccess: (data) => {
        console.log("Response Data: ", data);
        const responseSchema = z.object({ status: z.string() });
        const res = responseSchema.safeParse(data);

        if (res.data?.status === "P2002") {
          toast.info("Woops, looks like you've already registered.", {
            description:
              "Please wait for our sales team to contact you via email or phone.\nFeel free to visit our Contact page.",
            duration: 10000,
          });
          return;
        }

        toast.success("Aye! You are now registered.", {
          description: `Thanks for registering, our sales team will be in contact with you shortly via provided channels.`,
          duration: 10000,
        });
      },
    }
  );

  function onSubmit(values: z.infer<typeof UserFormSchema>) {
    console.log("Submitted Form Values: ", values);
    triggerCreate();
    router.push("/property-for-sale");
  }

  return (
    <Card>
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Become an Agent today</CardTitle>
        <CardDescription>Our agents are here to assist you</CardDescription>
      </CardHeader>
      <CardContent>
        {isMutatingCreate ? (
          <Loader className="h-[30vh]" />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="flex justify-center items-center flex-col gap-5 w-full">
                <div className="flex w-full justify-between items-center gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Surname</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Your surname" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full flex justify-center items-center flex-col gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Company (optional)</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <PhoneInput placeholder="Enter a phone number" {...field} defaultCountry="ZA" international />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isAgent"
                    render={({ field }) => (
                      <FormItem className="w-full flex justify-start items-center gap-5">
                        <FormLabel>Interested in selling your property?</FormLabel>
                        <FormDescription>Our sales team will contact you shortly.</FormDescription>
                        <FormControl className="">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            style={{ backgroundColor: "#3b82f6", margin: "0" }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

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
