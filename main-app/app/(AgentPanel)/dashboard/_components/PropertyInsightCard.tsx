import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, TrendingUp } from "lucide-react";
import Image from "next/image";
import PostHogClient from "@/components/Posthog";
import { PropertyWithAddress } from "@/app/api/(utils)/utils";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default async function PropertyInsightCard({
  property,
}: {
  property: PropertyWithAddress;
}) {
  return (
    <Card className="min-w-md rounded-tr-md rounded-tl-md hover:cursor-pointer hover:shadow-md">
      <Image
        src={property.images[0]}
        width={320}
        height={320}
        // fill
        alt="Thumbnail"
        className="rounded-tr-md rounded-tl-md w-full object-cover min-h-80"
        // className="rounded-md object-cover"
      />
      <CardDescription className="px-4 pt-4 flex w-full justify-between items-center gap-4 text-black">
        <p className="text-base font-semibold ">{property.title}</p>

        {/* <div className="flex justify-center items-center gap-2">
          <TrendingUp size={20} />
          <p className="text-base ">100 views</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <TrendingUp size={20} />
          <p className="text-base ">200 leads</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Eye size={20} />
          <p className="text-base">{property.visibility}</p>
        </div> */}
      </CardDescription>
      <CardContent className="flex justify-center items-center gap-3 px-4 pt-4">
        {/* <Button className="w-full bg-accent text-white">Boost</Button> */}
        <Link
          href={`/dashboard/property/${property.property_id}`}
          className={buttonVariants({
            variant: "outline",
            className: "w-full",
          })}
        >
          Edit
        </Link>
      </CardContent>
    </Card>
  );
}

export function PropertyInsightCardSkeleton() {
  return <Skeleton className="w-full h-[380px] sm:h-[200px]" />;
}
