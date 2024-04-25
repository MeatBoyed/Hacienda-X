// Import necessary dependencies
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Define the cn utility function
export function cn(...inputs: ClassValue[]) {
  // Merge class names using clsx
  const mergedClassNames = clsx(...inputs);

  // Merge Tailwind CSS class names using twMerge
  return twMerge(mergedClassNames);
}
