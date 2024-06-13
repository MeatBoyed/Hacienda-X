import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, TrendingUp } from "lucide-react";
import Image from "next/image";
import PostHogClient from "@/components/Posthog";

export default async function PropertyInsightCard() {
  return (
    <Card className="min-w-md rounded-tr-md rounded-tl-md hover:cursor-pointer hover:shadow-md">
      <Image
        src={"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"}
        width={370}
        height={300}
        alt="Thumbnail"
        className="rounded-tr-md rounded-tl-md"
      />
      <CardDescription className="px-4 pt-4 flex w-full justify-between items-center gap-4 text-black">
        <div className="flex justify-center items-center gap-2">
          <TrendingUp size={20} />
          <p className="text-base ">100 views</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <TrendingUp size={20} />
          <p className="text-base ">200 leads</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Eye size={20} />
          <p className="text-base">Public</p>
        </div>
      </CardDescription>
      <CardContent className="flex justify-center items-center gap-3 px-4 pt-4">
        <Button className="w-full bg-accent text-white">Boost</Button>
        <Button variant={"outline"} className="w-full">
          Insights
        </Button>
      </CardContent>
    </Card>
  );
}
