import { HiLocationMarker } from "@/node_modules copy/react-icons/hi";
import PrimaryButton from "./ui/Custom/PrimaryButton";

export default function Searchbar() {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-white rounded-md w-[90%] border-2 border-solid border-[#7878785f] text-background">
      <div className="flex justify-center items-center flex-row gap-2">
        <HiLocationMarker color="red" size={25} />
        <input
          type="text"
          placeholder="Location"
          className="outline-none"
        ></input>
      </div>
      {/* Lighter text colour */}
      <PrimaryButton content="Search" />
    </div>
  );
}
