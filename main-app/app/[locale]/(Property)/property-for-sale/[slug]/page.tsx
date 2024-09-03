import placeholderImage from "@/public/placeholder.svg";
import InformationCard from "./_components/InformationCard";
import ImageGallery from "./_components/ImageGallery";
import LeadForm from "@/components/LeadForm/LeadForm";
import Residencies from "@/app/[locale]/_components/Residencies";
import { ImageDialog } from "./(components)/ImageDialog";
import { ImageGalleryContextProvider } from "./(components)/imageGalleryContext";

export interface Property {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  features: string[];
  images: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

export default function PropertyView() {
  const property: Property = {
    title: "Luxurious Beachfront Villa",
    description:
      "Experience the ultimate in coastal living with this stunning beachfront villa. Enjoy breathtaking ocean views, direct beach access, and top-of-the-line amenities.",
    price: "$2,500,000",
    location: "Malibu, California",
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 3500,
    features: [
      "Ocean View",
      "Private Beach Access",
      "Gourmet Kitchen",
      "Home Theater",
      "Infinity Pool",
    ],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@realestate.com",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.title}</h1>

      {/* Image Gallery */}
      <ImageGallery defaultImages={property.images} />

      {/* Property Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <InformationCard property={property} />

        {/* <Card>
          <CardHeader>
            <CardTitle>Contact Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">{property.agent.name}</h3>
              <div className="flex items-center mb-2">
                <Phone className="mr-2 h-5 w-5" />
                <span>{property.agent.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <span>{property.agent.email}</span>
              </div>
            </div>
            <Button className="w-full">Contact Agent</Button>
          </CardContent>
        </Card> */}
        {/* <LeadForm agentId="kasjd" propertyId="aksjd" /> */}
      </div>

      <Residencies />
    </div>
  );
}
