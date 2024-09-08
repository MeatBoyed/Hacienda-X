import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Head() {
  const user = await currentUser();
  return (
    <header className="flex justify-between items-center mb-8 w-full">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Welcome back, {user?.firstName}!</h1>
        <p className="text-gray-600">
          Here&apos;s what&apos;s happening with your properties today.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          className={`bg-blue-500 text-white transition-all duration-300 ease-in-out transform hover:bg-blue-600`}
          variant={"link"}
        >
          <Link href="/property/create">Add New Listing</Link>
        </Button>
        {/* <div className="relative">
          <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            3
          </span>
        </div> */}
      </div>
    </header>
  );
}
