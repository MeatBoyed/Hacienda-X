import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, LucideIcon, Star, Users } from "lucide-react";

const data = [
  { title: "Total Listings", value: "24", change: "+2 from last month", icon: Home },
  {
    title: "Total Value",
    value: "$4.2M",
    change: "+12% from last month",
    icon: DollarSign,
  },
  { title: "Active Leads", value: "18", change: "+4 new this week", icon: Users },
  { title: "Avg. Rating", value: "4.8", change: "+0.2 from last month", icon: Star },
];

export default function Insights({
  insights,
}: {
  insights: {
    totalListings: number;
    totalValue: number;
    activeLeads: number;
  };
}) {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3 w-full">
      <InsightCard
        title="Total Listings"
        value={insights.totalListings.toString()}
        change={""}
        icon={<Home className="h-4 w-4 text-blue-600" />}
      />
      <InsightCard
        title="Total Value"
        value={insights.totalValue.toLocaleString()}
        change={""}
        icon={<DollarSign className="h-4 w-4 text-blue-600" />}
      />
      <InsightCard
        title="Active Leads"
        value={insights.activeLeads.toString()}
        change={""}
        icon={<Users className="h-4 w-4 text-blue-600" />}
      />
    </div>
  );
}

function InsightCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: JSX.Element;
}) {
  return (
    <Card className="overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {icon}
        {/* <icon className="h-4 w-4 text-blue-600" /> */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <p className="text-xs text-gray-500">{change}</p>
      </CardContent>
    </Card>
  );
}
