import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
            <Home className="w-12 h-12 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">No Propertie(s) Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Oops! It looks like we couldn't find any properties. This could be because:
          </p>
          <p className="text-muted-foreground">
            Don't worry! You can start by exploring our available listings or return to the
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
