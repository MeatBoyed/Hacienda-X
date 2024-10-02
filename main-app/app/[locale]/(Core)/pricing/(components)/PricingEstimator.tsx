"use client";

import { useCallback, useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { calculatePrice, MAX_LEADS, MAX_PROPERTIES } from "./pricingUtils";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import Link from "next/link";

export default function PricingEstimator() {
  const [leads, setLeads] = useState(100);
  const [properties, setProperties] = useState(5);
  const calcPrice = useCallback(() => calculatePrice(properties, leads), [properties, leads]);
  const price = useMemo(() => calcPrice(), [calcPrice]);

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="bg-blue-600 text-white p-6">
        <CardTitle className="text-2xl font-bold text-center">Pricing Estimator</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-10">
        <div className="text-center bg-blue-50 p-6 rounded-xl shadow-inner">
          <p className="text-sm text-gray-600 mb-2 font-medium">Your monthly quote:</p>
          <p className="text-6xl font-bold text-primary">${price}</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <label
              htmlFor="properties-slider"
              className="text-sm font-medium text-gray-700 flex justify-between"
            >
              <span>Number of Properties</span>
              <span className="text-primary font-semibold">{properties}</span>
            </label>
            <Slider
              id="properties-slider"
              min={1}
              max={MAX_PROPERTIES}
              step={1}
              value={[properties]}
              onValueChange={(value) => setProperties(Math.min(value[0], MAX_PROPERTIES))}
              className="bg-gray-600 rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="leads-slider"
              className="text-sm font-medium text-gray-700 flex justify-between"
            >
              <span>Leads per month</span>
              <span className="text-primary font-semibold">{leads}</span>
            </label>
            <Slider
              id="leads-slider"
              min={10}
              max={MAX_LEADS}
              step={10}
              value={[leads]}
              onValueChange={(value) => setLeads(Math.min(value[0], MAX_LEADS))}
              className="bg-gray-600 rounded-sm"
            />
          </div>
        </div>
        {properties === MAX_PROPERTIES || leads === MAX_LEADS ? <PricingAlertCard /> : undefined}
        <PricingInfoCard />
      </CardContent>
    </Card>
  );
}

function PricingAlertCard() {
  return (
    <Alert>
      <AlertDescription>
        You&apos;re growing fast! 🎉 Our Enterprise plan offers unlimited leads and custom features
        to help you scale your business. Contact our sales team for a personalized quote.
      </AlertDescription>
    </Alert>
  );
}

function PricingInfoCard() {
  return (
    <div className="text-sm text-gray-600 bg-gray-100 p-4 rounded-xl border border-gray-200">
      <p className="font-semibold mb-2 text-gray-800">What&apos;s included</p>
      <p className="mb-3 text-xs"></p>
      <ul className="list-disc list-inside text-sm space-y-1">
        <li className="font-medium text-gray-700">Up to {MAX_LEADS} leads per month</li>
        <li className="font-medium text-gray-700">Advanced lead tracking</li>
        <li className="font-medium text-gray-700">CRM integration</li>
        <li className="font-medium text-gray-700">24/7 customer support</li>
        <li className="font-medium text-gray-700">Real-time reporting</li>
        <li className="font-medium text-gray-700">Custom features available</li>
      </ul>
      <Link href="/contactus">
        <Button className="w-full mt-8 bg-blue-500 text-white hover:bg-blue-600" variant="link">
          <PhoneCall className="w-4 h-4 mr-2" />
          Contact Sales for Enterprise Plan
        </Button>
      </Link>
    </div>
  );
}
