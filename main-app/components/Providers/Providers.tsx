import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from "./PostHogProvider";
import dynamic from "next/dynamic";
import { BookmarksContextProvider } from "@/lib/bookmarksContext";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClerkProvider appearance={{}}>
        <BookmarksContextProvider>
          {/* <PHProvider> */}
          {/* <PostHogPageView /> */}
          {children}
          {/* </PHProvider> */}
        </BookmarksContextProvider>
      </ClerkProvider>
    </>
  );
}
