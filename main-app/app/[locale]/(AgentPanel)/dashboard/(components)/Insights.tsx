import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Home, Star, Users } from "lucide-react";

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

export default function Insights() {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4 w-full">
      {data.map((item, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{item.title}</CardTitle>
            <item.icon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">{item.value}</div>
            <p className="text-xs text-gray-500">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
