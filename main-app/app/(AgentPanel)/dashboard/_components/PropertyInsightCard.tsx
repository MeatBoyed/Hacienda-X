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

// Home page total views
const totalViewsQuery = `SELECT properties.$current_url AS current_url, count() AS url_count FROM events WHERE event = '$pageview' AND (distinct_id, timestamp) IN (SELECT distinct_id, min(timestamp) FROM events WHERE event = '$pageview' GROUP BY distinct_id) AND properties.$current_url = 'https://www.dstilezauto.co.za/' GROUP BY current_url ORDER BY url_count DESC`;

export default async function PropertyInsightCard() {
  const queryPayload = {
    query: { kind: "HogQLQuery", query: totalViewsQuery },
  };

  const posthog = PostHogClient();
  // const response = await posthog.fetch(
  //   "https://us.posthog.com/api/projects/67000/query",
  //   {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer phx_eTkOAA1w4HI4VFniW2NzBkawZQp2z4o8ZrlOb4H1FJN",
  //     },
  //     body: JSON.stringify(queryPayload),
  //   }
  // );

  const response = await fetch(
    "https://us.posthog.com/api/projects/67000/query",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer phx_eTkOAA1w4HI4VFniW2NzBkawZQp2z4o8ZrlOb4H1FJN",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryPayload),
    }
  );

  // console.log("Response: ", response);
  const data = await response.json();

  console.log("Data: ", data.results);
  console.log("Total Views: ", data.results[0][1]);

  // if (response.status == 200) {
  //   const text = await response.text();
  //   const json = await response.json();

  //   console.log("Text: ", text);
  //   console.log("Json: ", json);
  // }

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
