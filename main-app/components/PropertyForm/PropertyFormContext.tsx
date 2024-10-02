"use client";

import {
  createPropertyFormSchema,
  DeletePropertyPayload,
  PropertyFormSchema,
  PropertySchema,
} from "@/lib/FormUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useCreateProperty, useDeleteProperty, useUpdateProperty } from "./hooks";
import { TriggerWithArgs } from "swr/mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Enabling TS features
export type PropertyFormContext = {
  isMutatingCreate: boolean;
  isMutatingUpdate: boolean;
  isMutatingDelete: boolean;
  initProperty?: PropertyWithAddress;
  triggerCreate: TriggerWithArgs<
    any,
    any,
    "/api/dashboard/property/create",
    {
      property: PropertySchema;
    }
  >;
  triggerUpdate: TriggerWithArgs<
    any,
    any,
    "/api/dashboard/property/update",
    {
      property: PropertySchema;
    }
  >;
  triggerDelete: TriggerWithArgs<
    any,
    any,
    "/api/dashboard/property/delete",
    {
      payload: DeletePropertyPayload;
    }
  >;
  deleteHandler: () => Promise<void>;
  form: UseFormReturn<PropertyFormSchema, any, undefined>;
};

export const PropertyFormContext = createContext<PropertyFormContext | null>(null);

export function usePropertyFormContext() {
  const context = useContext(PropertyFormContext);
  if (!context) {
    throw new Error("usePropertyFormContext must be used within a PropertyFormContextProvider");
  }
  return context as PropertyFormContext;
}

export const PropertyFormContextProvider: React.FC<{
  initProperty?: PropertyWithAddress;
  children: React.ReactNode;
}> = ({ initProperty, children }) => {
  const router = useRouter();
  const t = useTranslations();
  const propertyFormSchema = createPropertyFormSchema(t);

  const form = useForm<PropertyFormSchema>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: getDefaultVaules(initProperty),
  });
  const { getValues } = form;

  const { triggerCreate, isMutatingCreate, createError } = useCreateProperty();
  const { triggerUpdate, isMutatingUpdate, updateError } = useUpdateProperty();
  const { triggerDelete, isMutatingDelete, deleteError } = useDeleteProperty();

  async function deleteHandler() {
    if (!initProperty) return;
    console.log("Deleting Property!");
    toast.promise(
      triggerDelete({
        payload: {
          agentId: initProperty.agent_id,
          propertyId: initProperty.property_id,
          images:
            initProperty.images.length > 0
              ? [...initProperty.images, ...getValues("images")]
              : [...getValues("images")],
        },
      }),
      {
        loading: "Deleteing property",
        success: (data) => {
          router.push("/dashboard");
          return "Property listing deleted successfully";
        },
      }
    );
    router.push("/dashboard/property");
  }

  return (
    <PropertyFormContext.Provider
      value={{
        form,
        deleteHandler,
        initProperty,
        triggerCreate,
        triggerUpdate,
        triggerDelete,
        isMutatingCreate,
        isMutatingUpdate,
        isMutatingDelete,
      }}
    >
      {children}
    </PropertyFormContext.Provider>
  );
};

function getDefaultVaules(initProperty: PropertyWithAddress | undefined) {
  return {
    property_id: initProperty?.property_id || "",
    title: initProperty?.title || "askdakjd ajdaaksdf",
    price: initProperty?.price || 1000000,
    description: initProperty?.description || "kasjdf aksdjf akdf aksfj",
    bathrooms: initProperty?.bathrooms || 2,
    bedrooms: initProperty?.bedrooms || 4,
    squareMeter: initProperty?.squareMeter || 4,
    pool: initProperty?.pool || false,
    images: initProperty?.images || [],
    extraFeatures: initProperty?.extraFeatures
      ? initProperty?.extraFeatures.map((feature, index) => ({
          id: index.toString(),
          text: feature,
        }))
      : [],
    address: initProperty?.Address?.address || "aksdj aksdjf askdfj aksdfj",
    lat: initProperty?.Address?.latitude || -239,
    lng: initProperty?.Address?.longitude || 123,
    visibility: initProperty?.visibility || "Public",
    saleType: initProperty?.saleType || "Sale",
  };
}
