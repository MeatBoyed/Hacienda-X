import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Rocket, Shield, Users } from "lucide-react";

interface InfoCard {
    title: string;
    description: string;
    icon: React.ReactElement;
    benefits: string[];
}

const infoCards: InfoCard[] = [
    {
      title: "Powerful Features",
      description: "Boost your productivity with our advanced tools and capabilities.",
      icon: <Rocket className="h-8 w-8 mb-4 text-primary" />,
      benefits: [
        "Intuitive dashboard",
        "Real-time collaboration",
        "Advanced analytics",
        "Customizable workflows",
      ],
    },
    {
      title: "Pay less as you grow",
      description:
        "For large-scale enterprises or startups looking to scale up, we offer a tiered pricing model that scales to fit your needs.",
      icon: <Shield className="h-8 w-8 mb-4 text-primary" />,
      benefits: [
        "End-to-end encryption",
        "Two-factor authentication",
        "Regular security audits",
        "GDPR compliant",
      ],
    },
    {
      title: "24/7 Customer Support",
      description: "Get help whenever you need it with our round-the-clock support team.",
      icon: <Users className="h-8 w-8 mb-4 text-primary" />,
      benefits: [
        "Live chat support",
        "Comprehensive knowledge base",
        "Video tutorials",
        "Dedicated account managers",
      ],
    },
  ];

export default function InfoCardSection() {
  return (
<div className="grid gap-8 md:grid-cols-3 ">
        {infoCards.map((card, index) => (
          <InfoCard key={index} card={card} />
        ))}
      </div>

  )
}

function InfoCard({ card }: { card: InfoCard }) {
    return (
        <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-center">{card.icon}</div>
          <CardTitle className="text-center">{card.title}</CardTitle>
          <CardDescription className="text-center">{card.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2">
            {card.benefits.map((benefit, benefitIndex) => (
              <li key={benefitIndex} className="flex items-center">
                <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Learn More</Button>
        </CardFooter>
      </Card>
    )
}