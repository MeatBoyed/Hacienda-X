import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CoreInputCard() {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
        <CardDescription>
          Easily add your property in 5 minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Title</Label>
            <Input
              id="title"
              type="text"
              className="w-full"
              placeholder="Give your property post a title"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="min-h-32"
              placeholder="Describe your property. Let your words flow"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Price</Label>
            <Input
              id="name"
              type="number"
              className="w-full"
              defaultValue="Gamer Gear Pro Controller"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
