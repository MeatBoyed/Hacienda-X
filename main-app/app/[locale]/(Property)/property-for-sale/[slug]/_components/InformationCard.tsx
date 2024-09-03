import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { property } from "lodash";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Property } from "../page";
import { Badge } from "@/components/ui/badge";

export default function InformationCard({ property }: { property: Property }) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center">
            <Bed className="mr-2 h-5 w-5" />
            <span className="text-lg">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center">
            <Bath className="mr-2 h-5 w-5" />
            <span className="text-lg">{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center">
            <Square className="mr-2 h-5 w-5" />
            <span className="text-lg">{property.squareFeet} sq ft</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            <span className="text-lg">{property.location}</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Features:</h3>
          <div className="flex flex-wrap gap-2">
            {property.features.map((feature, index) => (
              <Badge key={index} variant="outline" className="">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Price:</h3>
          <p className="text-2xl font-bold text-primary">{property.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}
