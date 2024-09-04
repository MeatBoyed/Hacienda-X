import InformationCard from "./_components/InformationCard";
import ImageGallery from "./_components/ImageGallery";
import LeadForm from "@/components/LeadForm/LeadForm";
import Residencies from "@/app/[locale]/_components/Residencies";
import { getTranslations } from "next-intl/server";
import { MapCard } from "../../../../../components/main/Maps/Map";
import { getProperties, getProperty } from "@/lib/RequestService";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { User } from "@prisma/client";

export default async function PropertyView({ params: { slug } }: { params: { slug: string } }) {
  const t = await getTranslations("Property.Property");
  const response = await getProperty(slug);

  const prop: PropertyWithAddress = {
    property_id: "1",
    agent_id: "1",
    extraFeatures: [
      "Ocean View",
      "Private Beach Access",
      "Gourmet Kitchen",
      "Home Theater",
      "Infinity Pool",
    ],
    pool: true,
    saleType: "Sale",
    sold: false,
    squareMeter: 3500,
    visibility: "Public",
    createdAt: new Date(),
    updatedAt: new Date(),
    Address: {
      address_id: "1",
      address: "123 Main St, Malibu, CA 90265",
      latitude: 34.0353,
      longitude: -118.701,
      property_id: "1",
    },
    title: "Luxurious Beachfront Villa",
    description:
      "Experience the ultimate in coastal living with this stunning beachfront villa. Enjoy breathtaking ocean views, direct beach access, and top-of-the-line amenities.",
    price: 2500000,
    bedrooms: 4,
    bathrooms: 3.5,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1475&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
  };
  const agent: User = {
    user_id: "1",
    public_id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@realestate.com",
    company: "London Prime Properties",
    role: "agent",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!response) {
    // Redirect to 404 or show message
    return <div>Property not found</div>;
  }
  const { properties, total } = response;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-12 md:mt-14">
      <h1 className="text-3xl font-bold mb-6">{properties[0].title}</h1>

      {/* Image Gallery */}
      <ImageGallery defaultImages={properties[0].images} />

      {/* Property Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <InformationCard property={properties[0]} agent={agent} />

        <LeadForm agentId={agent.user_id} propertyId={properties[0].property_id} />
      </div>

      <MapCard className="mb-8" properties={[]} />

      <Residencies className="w-full xl:px-0">
        <Residencies.Head subHeading={t("viewMore.subHeading")} heading={t("viewMore.heading")} />
      </Residencies>
    </div>
  );
}
