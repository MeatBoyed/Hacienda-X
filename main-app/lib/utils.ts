import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Define the cn utility function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Handles calling Querying to the API
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
