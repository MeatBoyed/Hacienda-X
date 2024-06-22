import { Hono } from "hono";
import db from "../(utils)/db";
import { Lead, Property } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { parseFormData } from "@/lib/FormUtils";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { validator } from "hono/validator";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

app.use(clerkMiddleware());

// Fetch All Leads - Private Endpoint
app.get("/", async (c) => {
  return c.json(await db.lead.findMany());
});

// Fetch Specific Lead - Private Endpoint
app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  // Database query (obvs)
  const property = await db.property.findFirst({
    where: { title: slug }, // Property needs a Slug field in DB
    include: { Address: true },
  });

  // Let the Client (Front-End) decide what to do with a 404
  if (!property) {
    return c.json({ results: undefined, notFound: true }, { status: 200 });
  }

  // Response object
  return c.json(
    { results: property, notFound: false },
    {
      status: 200,
    }
  );
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

// Delete Lead - Private Endpoint
app.post(
  "/delete",
  validator("form", (value, c) => {
    const parsed = parseFormData(value);

    if (!parsed) return c.text("Invalid!", 401);
    if (parsed.property_id === "") return c.text("Invalid! Prop.", 401);

    return parsed;
  }),
  async (c) => {
    // Get the current user
    const auth = getAuth(c);

    // Ensure user is signed in
    if (!auth?.userId) {
      console.log("Unable to authenticate user");
      throw new HTTPException(401);
    }

    const prop = c.req.valid("form");
    console.log("Your Submitted form data: ", prop);

    let property;

    // try {
    //   // Database query (obvs)
    //   property = await db.property.update({
    //     where: { property_id: prop.property_id },
    //     data: {
    //     },
    //     include: { Address: true },
    //   });
    // } catch (error: any) {
    //   // Show error in console for Debugging (Realistically this should be logged used a package)
    //   // Respond with an Error for Client "error" state
    //   throw new Error("Something went wrong. Error: ", error as Error);
    // }
    // if (!property) {
    //   throw new HTTPException(500, { message: "Error: Upserting property" });
    // }

    console.log("Updated Property: ", property);

    // Response object
    return c.json(
      { results: property },
      {
        status: 200,
      }
    );
  }
);

export type AppType = typeof app;
export default app;
