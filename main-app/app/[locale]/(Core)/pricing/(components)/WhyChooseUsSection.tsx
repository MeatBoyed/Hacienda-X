import { CheckCircle } from "lucide-react";

const whyChooseUs = [
  "Industry-leading innovation with regular feature updates",
  "99.9% uptime guarantee for uninterrupted service",
  "Flexible pricing plans to fit businesses of all sizes",
  "Dedicated customer success team to ensure your growth",
];

export default function WhyChooseUsSection() {
  return (
    <div className="px-2 md:px-0">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {whyChooseUs.map((reason, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className="mr-4 h-6 w-6 text-primary" />
            <p className="text-lg">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
