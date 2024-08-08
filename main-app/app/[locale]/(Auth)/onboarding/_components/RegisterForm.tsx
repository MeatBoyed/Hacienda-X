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
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/PhoneInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostAgent } from "@/app/api/(userActions)/actions";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";

// Lead Form UTILS
// export const UserFormSchema = z.object({
//   firstName: z.string().min(3, { message: "Name must be at least 3 characters long." }),
//   lastName: z.string().min(3, { message: "Surname must be at least 3 characters long." }),
//   email: z.string().email({ message: "Email address must be valid." }),
//   company: z.string().optional(),
//   phoneNumber: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }).optional(),
//   user_id: z.string().min(1, { message: "User Id is required" }),
//   isAgent: z.boolean(),
// });

const UserFormSchemaTranslated = (t: any) => {
  return z.object({
    firstName: z.string().min(3, { message: t("userFormSchema.firstName") }),
    lastName: z.string().min(3, { message: t("userFormSchema.lastName") }),
    email: z.string().email({ message: t("userFormSchema.email") }),
    company: z.string().optional(),
    phoneNumber: z
      .string()
      .refine(isValidPhoneNumber, { message: t("userFormSchema.phoneNumber") })
      .optional(),
    user_id: z.string().min(1, { message: t("userFormSchema.userId") }),
    isAgent: z.boolean(),
  });
};

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
  const t = useTranslations("Onboarding.registerFormComp");
  const router = useRouter();

  const UserFormSchema = UserFormSchemaTranslated(t);

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
        toast.error(t("toasts.error.title"), {
          description: t("toasts.error.description"),
        });
      },
      onSuccess: (data) => {
        console.log("Response Data: ", data);
        const responseSchema = z.object({ status: z.string() });
        const res = responseSchema.safeParse(data);

        if (res.data?.status === "P2002") {
          toast.info(t("toasts.error.alreadyRegisterd.title"), {
            description: t("toasts.error.alreadyRegisterd.description"),
            duration: 10000,
          });
          return;
        }

        toast.success(t("toasts.success.title"), {
          description: t("toasts.success.description"),
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
    <Card className="">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
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
                        <FormLabel>{t("formFields.name.label")}</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder={t("formFields.name.placeholder")} {...field} />
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
                        <FormLabel>{t("formFields.surname.label")}</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder={t("formFields.surname.placeholder")} {...field} />
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
                        <FormLabel>{t("formFields.email.label")}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t("formFields.email.placeholder")} {...field} />
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
                        <FormLabel>{t("formFields.company.label")}</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder={t("formFields.company.placeholder")} {...field} />
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
                        <FormLabel>{t("formFields.phonenumber.label")}</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder={t("formFields.phonenumber.placeholder")}
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
                    name="isAgent"
                    render={({ field }) => (
                      <FormItem className="w-full flex justify-start items-center gap-5">
                        {/* <FormLabel>{t("formFields.isAgent.label")}</FormLabel>
                        <FormDescription>{t("")}</FormDescription> */}
                        <FormControl className="">
                          {/* <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            style={{ backgroundColor: "#3b82f6", margin: "0" }}
                          /> */}
                          <div className="items-top flex mt-2 space-x-3">
                            <Checkbox
                              id="terms1"
                              className="data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 w-6 h-6"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {t("formFields.isAgent.label")}
                              </label>
                              <p className="text-sm text-muted-foreground">{t("formFields.isAgent.description")}</p>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="text-white bg-accent w-full">
                {t("formFields.submitButton")}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
