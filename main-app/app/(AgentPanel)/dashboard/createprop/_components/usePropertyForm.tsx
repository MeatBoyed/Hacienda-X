"use client";

import { toast } from "@/components/ui/use-toast";
import { Link } from "lucide-react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { PropertySchema } from "./FormUtils";

export async function sendUpsertRequest(
  url: string,
  { arg }: { arg: { property: z.infer<typeof PropertySchema> } }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export default function usePropertyForm() {
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    link: string;
  } | null>();

  const { trigger, isMutating, data } = useSWRMutation(
    "/api/properties/create",
    sendUpsertRequest /* options */,
    {
      onError: () => {
        toast({
          title: "Something unexpected happened.",
          description: "Please try again...",
          duration: 10000,
        });
      },
      onSuccess: (data) => {
        // Posthog Action
        // const posthog = PostHogClient();
        // posthog.identify({
        //   distinctId: userId, // replace with a user's distinct ID
        //   properties: { role: role },
        // });
        console.log("Response Data: ", data);

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

  const handleSubmit = async (formData: z.infer<typeof PropertySchema>) => {
    console.log("Recieved Data: ", formData);
    await trigger({ property: formData });
    setToastMessage({
      message: "Checkout properties in your area",
      link: "/properties-for-sale",
    });
  };

  return { handleSubmit, isMutating };
}
