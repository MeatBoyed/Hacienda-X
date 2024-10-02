import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { useTranslations } from "next-intl"; // Assuming you're using react-i18next for translations
import { PropertyServiceResponse } from "@/Server/lib/PropertyService";
import { DeleteProperty, PostProperty } from "@/lib/RequestUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { DeletePropertyPayload } from "@/lib/FormUtils";

const useCreateProperty = () => {
  const t = useTranslations("Dashboard.propertyFormComp");

  const {
    trigger: triggerCreate,
    isMutating: isMutatingCreate,
    error: createError,
  } = useSWRMutation("/api/dashboard/property/create", PostProperty /* options */, {
    onError: (error) => {
      console.log("Server Error Occured: ", error);
      toast.error(t("toasts.error.title"), {
        description: t("toasts.error.description"),
      });
    },
  });

  return { triggerCreate, isMutatingCreate, createError };
};

const useUpdateProperty = () => {
  const t = useTranslations("Dashboard.propertyFormComp");

  const {
    trigger: triggerUpdate,
    isMutating: isMutatingUpdate,
    error: updateError,
  } = useSWRMutation("/api/dashboard/property/update", PostProperty /* options */, {
    onError: (error) => {
      console.log("SERVER RESPONSE ERROR: ", error);
      toast.error(t("toasts.error.title"), {
        description: t("toasts.error.description"),
      });
    },
  });

  return { triggerUpdate, isMutatingUpdate, updateError };
};

const useDeleteProperty = () => {
  const t = useTranslations("Dashboard.propertyFormComp");

  const {
    trigger: triggerDelete,
    isMutating: isMutatingDelete,
    error: deleteError,
  } = useSWRMutation(`/api/dashboard/property/delete`, DeleteProperty /* options */, {
    onError: (error) => {
      console.log("SERVER RESPONSE ERROR: ", error);
      toast.error(t("toasts.error.title"), {
        description: t("toasts.error.description"),
      });
    },
  });

  return { triggerDelete, isMutatingDelete, deleteError };
};

export { useCreateProperty, useUpdateProperty, useDeleteProperty };
