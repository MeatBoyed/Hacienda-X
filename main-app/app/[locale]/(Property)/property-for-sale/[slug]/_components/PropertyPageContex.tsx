import { PropertyWithAddressAndAgent } from "@/Server/utils/utils";
import { createContext, useContext } from "react";

export type PropertyPageContext = {
  property: PropertyWithAddressAndAgent[];
};

export const PropertyPageContext = createContext<PropertyPageContext | undefined>(undefined);

export function usePropertyPageContext() {
  const context = useContext(PropertyPageContext);
  if (!context) throw new Error("usePropertyPageContext must be used within a PropertyPageProvider");
  return context;
}
