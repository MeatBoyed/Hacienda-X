"use client";

import { useState, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";

// Pricing calculation function
function calculatePrice(leads: number) {
  // Base price
  let price = 50;

  // Add $0.50 per lead
  price += leads * 0.5;

  // Volume discounts
  if (leads > 500) price *= 0.9; // 10% discount for over 500 leads
  if (leads > 1000) price *= 0.85; // Additional 15% discount for over 1000 leads

  return Math.round(price);
}

export default function PricingCalculator() {
  const [leadsPerMonth, setLeadsPerMonth] = useState(100);
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [maxLeads, setMaxLeads] = useState(2000);


  useEffect(() => {
    const price = calculatePrice(leadsPerMonth);
    setMonthlyPrice(Math.min(price, 500));

    // Find the maximum number of leads before hitting $500
    let maxLeadsBeforeCap = leadsPerMonth;
    while (calculatePrice(maxLeadsBeforeCap) <= 500) {
      maxLeadsBeforeCap++;
    }
    setMaxLeads(maxLeadsBeforeCap - 1);
  }, [leadsPerMonth]);

  const isEnterprise = monthlyPrice >= 500;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Pricing Calculator</CardTitle>
        <CardDescription>Adjust the slider to see your monthly quote</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label htmlFor="leads-slider" className="block text-sm font-medium text-gray-700 mb-2">
              Leads per month: {leadsPerMonth}
            </label>
            <Slider
              id="leads-slider"
              min={10}
              max={maxLeads}
              step={10}
              value={[leadsPerMonth]}
              onValueChange={(value) => setLeadsPerMonth(value[0])}
              className="w-full bg-blue-950"
            />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">
              ${monthlyPrice}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </p>
            {isEnterprise && (
              <p className="text-sm text-primary mt-2">
                For high-volume needs, please contact our sales team for a custom enterprise plan.
              </p>
            )}
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">What&apos;s included:</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Up to {isEnterprise ? "1000+" : leadsPerMonth} leads per month</li>
              <li>Advanced lead tracking</li>
              <li>CRM integration</li>
              <li>24/7 customer support</li>
              <li>Real-time reporting</li>
              {isEnterprise && <li>Custom features available</li>}
            </ul>
          </div>
          {isEnterprise && (
            <Button className="w-full" variant="outline">
              <PhoneCall className="w-4 h-4 mr-2" />
              Contact Sales for Enterprise Plan
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
