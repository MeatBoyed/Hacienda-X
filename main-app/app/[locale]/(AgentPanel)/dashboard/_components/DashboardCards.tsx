"use client";
import ErrorView, { EmptyView, MessageView } from "@/components/main/Views/ErrorView";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { Lead } from "@prisma/client";
import { Table } from "lucide-react";
import { useMemo } from "react";

export function PropertyListCard({
  properties: defaultProperties,
}: {
  properties?: PropertyWithAddress[];
}) {
  const properties = useMemo(
    () =>
      defaultProperties?.map((property) => (
        <TableRow
          key={property.Address?.address}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <TableCell>{property.Address?.address}</TableCell>
          <TableCell className="text-gray-800 font-medium">{property.price}</TableCell>
          <TableCell>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                property.visibility === "Public"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {property.visibility}
            </span>
          </TableCell>
        </TableRow>
      )),
    [defaultProperties]
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-gray-800">Listed Properties</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Request likely failed */}
        {!defaultProperties && (
          <MessageView
            h1="Oops! Something went wrong."
            p="Please wait, or you can try again."
            button={{ href: "", text: "Try again", refresh: true }}
          />
        )}
        {defaultProperties && defaultProperties.length === 0 && (
          <MessageView
            h1="No properties found."
            p="You can add a property by clicking the button below."
            button={{ text: "Add Property", href: "/property/create" }}
          />
        )}
        {defaultProperties && (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Address</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{properties}</TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export function LeadsCard({ leads: defaultLeads }: { leads?: Lead[] }) {
  const leads = useMemo(
    () =>
      defaultLeads?.map((lead, index) => (
        <div
          key={index}
          className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <img
            src={`/placeholder.svg?height=40&width=40&text=${lead.name[0]}`}
            alt={`${lead.name}'s profile`}
            className="rounded-full mr-4 bg-blue-100 text-blue-600"
            width={40}
            height={40}
          />
          <div>
            <p className="font-medium text-gray-800">{lead.name}</p>
            <p className="text-sm text-gray-600">{lead.email}</p>
          </div>
          <div className="ml-auto text-sm text-gray-500">{lead.createdAt.toUTCString()}</div>
        </div>
      )),
    []
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-gray-800">Recent Leads</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          {/* Request likely failed */}
          {!defaultLeads && (
            <MessageView
              h1="Oops! Something went wrong."
              p="Please wait, or you can try again."
              button={{ href: "", text: "Try again", refresh: true }}
            />
          )}
          {defaultLeads && defaultLeads.length > 0 ? (
            leads
          ) : (
            <MessageView h1="No leads found." p="We'll let you know when they come in." />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
