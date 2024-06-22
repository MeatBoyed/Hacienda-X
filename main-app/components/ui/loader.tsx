import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <PuffLoader color="blue" />
    </div>
  );
}
