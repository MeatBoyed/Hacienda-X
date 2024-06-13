import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "./PostHogProvider";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProvider appearance={{}}>
        {/* <PHProvider> */}
        {/* <PostHogPageView /> */}
        {children}
        {/* </PHProvider> */}
      </ClerkProvider>
    </>
  );
}
