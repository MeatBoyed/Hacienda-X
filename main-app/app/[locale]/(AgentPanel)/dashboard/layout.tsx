import type { Metadata } from "next";
import { Suspense } from "react";
import Loader from "@/components/ui/loader";
import "mapbox-gl/dist/mapbox-gl.css";
import { Header } from "@/components/Header";
import { verifyUser } from "@/lib/roles";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard - HaciendaX",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const verifyStatus = await verifyUser();

  if (!verifyStatus) {
    redirect("/onboarding");
  }
  return (
    <div className="overflow-hidden bg-white">
      <Header isDashboard />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}
