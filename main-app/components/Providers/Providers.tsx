import { ClerkProvider } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { BookmarksContextProvider } from "@/lib/bookmarksContext";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "sonner";
import { enUS, esES } from "@clerk/localizations";

const PostHogPageView = dynamic(() => import("./PostHogPageView"), {
  ssr: false,
});

export default async function Providers({ children, locale }: { children: React.ReactNode; locale: string }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ClerkProvider localization={locale === "es" ? esES : enUS} appearance={{}}>
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
