import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Tech Innovators Inc.",
    quote:
      "This platform has revolutionized our workflow. We've seen a 40% increase in productivity since implementing it.",
  },
  {
    name: "Michael Chen",
    company: "Global Solutions Ltd.",
    quote:
      "The customer support is unparalleled. Any issues we've had were resolved quickly and efficiently.",
  },
  {
    name: "Emily Rodriguez",
    company: "StartUp Dynamo",
    quote:
      "As a growing startup, this platform has scaled perfectly with our needs. It's been instrumental in our success.",
  },
];

export default function TestimonialSection() {
  return (
    <div className="">
      <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            company={testimonial.company}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  name,
  company,
}: {
  quote: string;
  name: string;
  company: string;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-400" />
          <Star className="mr-2 h-5 w-5 text-yellow-400" />
          <Star className="mr-2 h-5 w-5 text-yellow-400" />
          <Star className="mr-2 h-5 w-5 text-yellow-400" />
          <Star className="mr-2 h-5 w-5 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="italic mb-4">&quot;{quote}&quot;</p>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{company}</p>
      </CardContent>
    </Card>
  );
}
