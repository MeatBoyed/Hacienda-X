import { Hono } from "hono";
import db from "../utils/db";
import { Lead, Property } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { parseFormData } from "@/lib/FormUtils";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { validator } from "hono/validator";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { authenticateUser } from "./dashboardController";

const app = new Hono();

app.use(clerkMiddleware());

// Fetch All Leads - Private Endpoint
app.get("/", async (c) => {
  return c.json(await db.lead.findMany());
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
app.post(
  "/create",
  zValidator(
    "json",
    z.object({
      name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long." }),
      surname: z
        .string()
        .min(3, { message: "Surname must be at least 3 characters long." }),
      email: z.string().email({ message: "Email address must be valid." }),
      message: z.string().min(10, {
        message: "Please enter a short message, longer than 10 characters.",
      }),
      phoneNumber: z.string(),
      propertyId: z.string().min(3, { message: "Property Id is required" }),
      agentId: z.string().min(3, { message: "Agent Id is required" }),
    })
  ),
  async (c) => {
    const leadPayload = c.req.valid("json");
    console.log("Your Submitted form data: ", leadPayload);

    const auth = getAuth(c);

    // Database query (obvs)
    return c.json(
      await db.lead.create({
        data: {
          name: leadPayload.name,
          email: leadPayload.email,
          surname: leadPayload.surname,
          message: leadPayload.message,
          property_id: leadPayload.propertyId,
          phoneNumber: leadPayload.phoneNumber,
          agent: {
            connect: { public_id: leadPayload.agentId },
          },
          customer_id: auth?.userId || undefined,
        },
      })
    );
  }
);

export type AppType = typeof app;
export default app;
