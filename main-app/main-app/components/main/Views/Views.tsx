"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Home, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ErrorView() {
  const router = useRouter();

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong.</h1>
      <p className="text-gray-600 mb-6">Please try again.</p>
      <button
        onClick={() => router.refresh()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reload Page
      </button>
    </div>
  );
}

export function MessageView({
  h1,
  p,
  button,
}: {
  h1: string;
  p: string;
  button?: { text: string; href: string; refresh?: boolean };
}) {
  const router = useRouter();

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{h1}</h1>
      <p className="text-gray-600 mb-6">{p} </p>
      {button && (
        <button
          onClick={() => (button.refresh ? router.refresh() : router.push(button.href))}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {button.text}
        </button>
      )}
    </div>
  );
}
export function EmptyView() {
  const router = useRouter();

  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">No properties found.</h1>
      <p className="text-gray-600 mb-6">You can add a property by clicking the button below.</p>
      <button
        onClick={() => router.push("/add-property")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Property
      </button>
    </div>
  );
}

export function NotFoundViewCard({ className }: { className?: string }) {
  return (
    <div className={cn("container mx-auto px-4 flex items-center justify-center ", className)}>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
            <Home className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">No Propertie(s) Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Oops! It looks like we couldn&apos;t find any properties matching your search query.
          </p>
          <p className="text-muted-foreground">
            Don&apos;t worry! You can start by exploring our available listings or return to the
            homepage.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-blue-500 text-white hover:bg-blue-600">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">
              <Search className="w-4 h-4 mr-2" />
              Search Properties
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
