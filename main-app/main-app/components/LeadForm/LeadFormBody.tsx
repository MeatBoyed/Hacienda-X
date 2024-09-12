"use client";
import { useTranslations } from "next-intl";
import { PhoneInput } from "../PhoneInput";
import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LeadForm, LeadFormSchema, useLeadFormContext } from "./LeadFormContext";
import Loader from "../ui/loader";

export function LeadFormBody() {
  const t = useTranslations();
  const { onSubmit, isMutatingCreate, form } = useLeadFormContext();

  return (
    <>
      {isMutatingCreate && (
        <div
          id="formLoader"
          className=" w-full flex justify-center items-center min-h-[50vh] flex-col gap-4"
        >
          <Loader className="h-fit" />
          <p className="text-md">Loading</p>
        </div>
      )}
      {!isMutatingCreate && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center items-center gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("propertyform.name")}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder={t("propertyform.yourName")}
                        {...field}
                      />
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
                      <Input
                        type="text"
                        id="surname"
                        placeholder={t("propertyform.yourSurname")}
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
                  <FormLabel>{t("propertyform.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder={t("propertyform.emailPlaceholder")}
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
            <Button
              id="submitLead"
              type="submit"
              className="text-white hover:bg-blue-500 bg-accent w-full"
            >
              {t("propertyform.submit")}
            </Button>
          </form>
        </Form>
      )}
    </>
  );
}
