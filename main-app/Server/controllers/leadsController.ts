import { Hono } from "hono";
import db from "../utils/db";
import { HTTPException } from "hono/http-exception";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { authenticateUser } from "./dashboardController";
import LeadService, { LeadPayloadSchema } from "../lib/LeadService";
import { StatusCode } from "hono/utils/http-status";

const leadService = new LeadService();
const app = new Hono();

app.use(clerkMiddleware());

// Fetch All Leads - Private Endpoint
app.get("/", async (c) => {
  const { userId } = authenticateUser(c);

  const leads = await db.lead.findMany({ where: { agent_id: userId } });

  return c.json({
    leads: leads,
    properties: await Promise.all(
      leads.map(async (lead, index) => {
        return await db.property
          .findFirstOrThrow({
            where: { property_id: lead.property_id },
            select: { title: true },
          })
          .then((prop) => prop.title);
      })
    ),
  });
});

// Fetch Specific Lead - Private Endpoint
app.get("/:slug", async (c) => {
  const { userId } = authenticateUser(c);
  const slug = c.req.param("slug");

  // Database query (obvs)
  const lead = await db.lead.findFirst({
    where: { agent_id: userId }, // Property needs a Slug field in DB
  });
});

// Create Lead - Private Endpoint
app.post("/create", zValidator("json", LeadPayloadSchema), async (c) => {
  const leadPayload = c.req.valid("json");

  const response = await leadService.Create(leadPayload);
  if (response.err) throw new HTTPException((response.val.status as StatusCode) || 500, { message: response.val.message });

  return c.json(response.val);
});

export type AppType = typeof app;
export default app;
