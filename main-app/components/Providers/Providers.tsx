import { ClerkProvider } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { BookmarksContextProvider } from "@/lib/bookmarksContext";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export default async function Providers({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <ClerkProvider appearance={{}}>
        <BookmarksContextProvider>
          {/* <PHProvider> */}
          {/* <PostHogPageView /> */}
          {children}
          <Toaster richColors />
          {/* </PHProvider> */}
        </BookmarksContextProvider>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
