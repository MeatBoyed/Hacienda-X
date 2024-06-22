import { cn } from "@/lib/utils";
import React from "react";
import { PuffLoader } from "react-spinners";

// export default function Loader({ className} : { className:}) {
//   return (
//     <div className={cn("w-full h-[100vh] flex justify-center items-center", className)}>
//       <PuffLoader color="blue" />
//     </div>
//   );
// }

export interface InputProps extends React.InputHTMLAttributes<HTMLDivElement> {}

const Loader = React.forwardRef<HTMLDivElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "w-full h-[100vh] flex justify-center items-center",
          className
        )}
      >
        <PuffLoader color="blue" />
      </div>
    );
  }
);
Loader.displayName = "Loader";

// export { AddressInput };
export default Loader;
