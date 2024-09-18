// Base Fee
export const BASE_PRICE = 29;
// Leads
export const COST_PER_LEAD = 5;
export const MAX_LEADS = 200;
// Views
export const VISITS_PER_PROPERTY = 100;
export const VISIT_FACTOR = 0.02;
// Properties
export const MAX_PROPERTIES = 20;
export const PropertyFactor = 1;

export const calculatePrice = (properties: number, leads: number) => {
  const viewsPrice = VISIT_FACTOR * (properties * VISITS_PER_PROPERTY);
  const leadsPrice = COST_PER_LEAD * leads;
  const propertiesPrice = PropertyFactor * properties;

  const price = leadsPrice + viewsPrice + propertiesPrice;
  return Math.round(price);
};
