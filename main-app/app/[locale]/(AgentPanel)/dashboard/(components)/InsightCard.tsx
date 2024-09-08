import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// Home page total views
const totalViewsQuery = `SELECT properties.$current_url AS current_url, count() AS url_count FROM events WHERE event = '$pageview' AND (distinct_id, timestamp) IN (SELECT distinct_id, min(timestamp) FROM events WHERE event = '$pageview' GROUP BY distinct_id) AND properties.$current_url = 'https://www.dstilezauto.co.za/' GROUP BY current_url ORDER BY url_count DESC`;

export default async function InsightCard() {
  let totalViews;
  let error = false;
  const queryPayload = {
    query: { kind: "HogQLQuery", query: totalViewsQuery },
  };

  try {
    error = false;
    const response = await fetch(
      "https://us.posthog.com/api/projects/67000/query",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer phx_eTkOAA1w4HI4VFniW2NzBkawZQp2z4o8ZrlOb4H1FJN", // SECUIRTY RISK!!
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryPayload),
      }
    );

    // console.log("Response: ", response);
    const data = await response.json();

    console.log("Data: ", data.results);
    console.log("Total Views: ", data.results[0][1]);
    totalViews = data.results[0][1];
  } catch (err) {
    error = true;
  }

  return (
    <Card className="min-w-md">
      <CardHeader className="gap-2 flex-row items-end">
        <CardTitle className="text-4xl">
          {totalViews.toLocaleString()} {error && "Err, try again"}
        </CardTitle>
        <CardDescription>Views</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center gap-3">
        <TrendingUp />
        <p className="text-xs text-muted-foreground">+25% from last week</p>
      </CardContent>
    </Card>
  );
}
