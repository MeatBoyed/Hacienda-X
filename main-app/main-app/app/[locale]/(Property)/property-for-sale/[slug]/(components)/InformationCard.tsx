import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Bath, Square, MapPin, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { User } from "@prisma/client";

export default function InformationCard({
  property,
  agent,
}: {
  property: PropertyWithAddress;
  agent: User;
}) {
  return (
    <Card className="md:col-span-2">
      <CardHeader className="">
        <CardTitle>Property Details</CardTitle>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center flex-col md:flex-row">
            <Bed className="mr-2 h-5 w-5" />
            <span className="text-base md:text-lg">{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <Bath className="mr-2 h-5 w-5" />
            <span className="text-base md:text-lg">{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <Square className="mr-2 h-5 w-5" />
            <span className="text-base md:text-lg">
              {property.squareMeter?.toLocaleString()} sq m
            </span>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <MapPin className="mr-2 h-5 w-5" />
            <span className="text-base md:text-lg">{property.Address?.address}</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Features</h3>
          <div className="flex flex-wrap gap-2">
            {property.extraFeatures.map((feature, index) => (
              <Badge key={index} variant="outline" className="">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Price</h3>
          <p className="text-2xl font-bold text-primary">$ {property.price.toLocaleString()}</p>
        </div>
        <div className="mt-8">
          <h3 className="font-semibold mb-4">Agent Information</h3>
          <div className="flex items-center mb-2">
            <span className="font-medium mr-2">Name:</span>
            <span>
              {agent.firstName} {agent.lastName}
            </span>
          </div>
          {/* <div className="flex items-center mb-2">
            <span className="font-medium mr-2">Phone:</span>
            <span>{agent.}</span>
          </div> */}
          <div className="flex items-center mb-2">
            <span className="font-medium mr-2">Email:</span>
            <span>{agent.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium mr-2">Agency:</span>
            <span>{agent.company}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
