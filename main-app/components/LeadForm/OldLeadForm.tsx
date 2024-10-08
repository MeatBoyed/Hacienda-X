"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
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
import { useTranslations } from "next-intl";
import { useEffect } from "react";

// Lead Form UTILS
export const LeadFormSchema = z.object({
  name: z.string().min(3, { message: "propertyform.nameError" }),
  surname: z.string().min(3, { message: "propertyform.surnameError" }),
  email: z.string().email({ message: "propertyform.emailError" }),
  message: z.string().min(10, {
    message: "propertyform.messageError",
  }),
  phoneNumber: z.string().refine(isValidPhoneNumber, { message: "propertyform.phoneError" }),
  propertyId: z.string().min(3, { message: "propertyform.propertyIdError" }),
  agentId: z.string().min(3, { message: "propertyform.agentIdError" }),
});

export default function LeadForm({ propertyId, agentId }: { propertyId: string; agentId: string }) {
  const t = useTranslations();
  const user = useUser();
  const form = useForm<z.infer<typeof LeadFormSchema>>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      name: user.user?.firstName || "",
      email: user.user?.primaryEmailAddress?.emailAddress || "",
      surname: user.user?.lastName || "",
      agentId: agentId,
      propertyId: propertyId,
      message: t("propertyform.messagePlaceholder"),
    },
  });

  const { trigger: triggerCreate, isMutating: isMutatingCreate } = useSWRMutation("/api/leads/create", PostLead /* options */, {
    onError: (error) => {
      console.log("Received Error (Plain): ", error);
      toast.error(t("propertyform.unexpectedError"), {
        description: t("propertyform.tryAgain"),
        duration: 10000,
        id: "errorToast",
      });
    },
    onSuccess: (data) => {
      // Show message
      console.log(data);
      toast.success(t("propertyform.leadPosted"), {
        description: t("propertyform.thankYou"),
        duration: 10000,
        id: "successToast",
      });
    },
  });

  function onSubmit(values: z.infer<typeof LeadFormSchema>) {
    console.log(values);
    triggerCreate({ lead: values });
  }

  return (
    <Card id="LeadForm" className="w-full min-h-[50vh] sm:w-[70%] shadow-lg px-2">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>{t("propertyform.contactAgent")}</CardTitle>
        <CardDescription>{t("propertyform.agentDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        {isMutatingCreate && (
          <div id="formLoader" className=" w-full flex justify-center items-center min-h-[50vh] flex-col gap-4">
            <Loader className="h-fit" />
            <p className="text-md">Loading</p>
          </div>
        )}
        {!isMutatingCreate && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {}
              <div className="flex justify-center items-center gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("propertyform.name")}</FormLabel>
                      <FormControl>
                        <Input type="text" id="name" placeholder={t("propertyform.yourName")} {...field} />
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
                      <FormLabel>{t("propertyform.surname")}</FormLabel>
                      <FormControl>
                        <Input type="text" id="surname" placeholder={t("propertyform.yourSurname")} {...field} />
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
                    <FormLabel>{t("propertyform.email")}</FormLabel>
                    <FormControl>
                      <Input type="email" id="email" placeholder={t("propertyform.emailPlaceholder")} {...field} />
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
                    <FormLabel>{t("propertyform.phoneNumber")}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        id="phoneNumber"
                        placeholder={t("propertyform.phonePlaceholder")}
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
                    <FormLabel>{t("propertyform.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder={t("propertyform.messagePlaceholder")}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button id="submitLead" type="submit" className="text-white hover:bg-blue-500 bg-accent w-full">
                {t("propertyform.submit")}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
