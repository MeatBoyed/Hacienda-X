"use server";
import LeadService from "@/Server/lib/LeadService";
import PropertyService from "@/Server/lib/PropertyService";

async function getUsersProperties(agentId: string) {
  const res = await PropertyService.GetAll(agentId);
  if (res.err) return undefined;

  return res.val;
}

async function getUsersLeads(agentId: string) {
  const res = await LeadService.GetAll(agentId);
  if (res.err) return undefined;

  return res.val;
}

export async function getUsersDashboard(agentId: string) {
  const properties = await getUsersProperties(agentId);
  const leads = await getUsersLeads(agentId);
  let totalValue = 0;

  if (properties) {
    properties.properties.map((prop) => {
      totalValue += prop.price;
    });
  }

  return {
    totalValue,
    leads: leads?.leads,
    properties: properties?.properties,
  };
}
