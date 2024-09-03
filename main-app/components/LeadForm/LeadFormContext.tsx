"use client";

import { PostLead } from "@/lib/RequestUtils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

// Enabling TS features
export type LeadFormContext = {
  isMutatingCreate: boolean;
  onSubmit: (data: LeadForm) => void;
  agentId: string
  propertyId: string
};

export const LeadFormContext = createContext<LeadFormContext | null>(null);

export function useLeadFormContext() {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadFormContext must be used within a LeadFormContextProvider");
  }
  return context as LeadFormContext;
}

export const LeadFormContextProvider: React.FC<{
  agentId: string;
  propertyId: string;
  children: React.ReactNode;
}> = ({ agentId, propertyId, children }) => {
  const t = useTranslations();
 
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

  const onSubmit = useCallback((data: LeadForm) => {
    console.log(data);
    triggerCreate({ lead: data });
  }, []);


  return <LeadFormContext.Provider value={{ onSubmit, isMutatingCreate, agentId, propertyId }}>{children}</LeadFormContext.Provider>;
};

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
export type LeadForm = z.infer<typeof LeadFormSchema>;
