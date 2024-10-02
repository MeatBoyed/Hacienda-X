import { PropertyWithAddress } from "@/Server/utils/utils";
import { PropertyFormContextProvider } from "./PropertyFormContext";
import { PropertyFormBody } from "./PropertyFormBody";
import PropertyFormHead from "./PropertyFormHead";

export default async function PropertyForm({
  initProperty,
}: {
  initProperty?: PropertyWithAddress;
}) {
  return (
    <PropertyFormContextProvider initProperty={initProperty}>
      <PropertyFormBody />
    </PropertyFormContextProvider>
  );
}
