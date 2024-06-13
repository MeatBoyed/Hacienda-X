import { Hono } from "hono";
import db from "../(utils)/db";
import { Prisma, Property } from "@prisma/client";
import { HTTPException } from "hono/http-exception";
import { PropertySchema } from "@/app/(AgentPanel)/dashboard/createprop/_components/FormUtils";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

app.use(clerkMiddleware());

// Endpoint ("/api/properties")
app.get("/", async (c) => {
  try {
    // Database query (obvs)
    const properties = await db.property.findMany({
      include: { Address: true },
    });

    // Response object
    return c.json(
      { results: properties },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    // Use as a "Catch-All" error handler
    // Show error in console for Debugging (Realistically this should be logged used a package)
    console.log(error);

    // Respond with an Error for Client "error" state
    throw new HTTPException(500, {
      message: "An Unexpected error occurred",
    });
  }
});

// Endpoint ("/api/properties/:slug")
// - The slug will be the public, Search Engine Optimized, unique identifier for Properties.
app.get("/:slug", async (c) => {
  try {
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
  } catch (error: any) {
    // Use as a "Catch-All" error handler
    // Show error in console for Debugging (Realistically this should be logged used a package)
    console.log(error);

    // Respond with an Error for Client "error" state
    throw new HTTPException(500, { message: "An unexpected error occured" });
  }
});

// Update the User's Role
const CreatePropertyRequest = z.object({
  property: PropertySchema,
});
app.post(
  "/create",
  // Validates the Incoming data is the correct type through Zod validation schema
  zValidator("json", CreatePropertyRequest),
  async (c) => {
    // Get the current user
    const auth = getAuth(c);

    // Ensure user is signed in
    if (!auth?.userId) {
      console.log("Unable to authenticate user");
      throw new HTTPException(401);
    }
    const formData = c.req.valid("json").property;
    // const cleanedFormData: Omit<z.infer<typeof PropertySchema>, "property_id"
    const formProperty: Omit<
      Property,
      "createdAt" | "updatedAt" | "property_id"
    > = {
      agent_id: auth.userId,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      bathrooms: formData.bathrooms,
      bedrooms: formData.bedrooms,
      pool: formData.pool,
      visibility: formData.visibility,
      saleType: formData.saleType,
      sold: false,
      images: [],
      extraFeatures: formData.extraFeatures.map((feature) => {
        return feature.text;
      }),
    };

    // Get Payload UserId & Desired Role
    console.log("Your Property Form Data: ", formProperty);
    let property;

    try {
      // Database query (obvs)
      property = await db.property.create({
        // where: {
        //   property_id:
        //     formData.property_id === "" ? formData.property_id : undefined,
        //   agent_id: formProperty.agent_id,
        // },
        data: {
          ...formProperty,
          agent_id: auth.userId,
          images: [],
          sold: false,
          extraFeatures: formData.extraFeatures.map((feature) => {
            return feature.text;
          }),
          Address: {
            create: {
              address: formData.Address.address,
              street: "dffg",
              city: "ksdf",
              country: "asd",
              longitude: formData.Address.lat,
              latitude: formData.Address.lng,
            },
          },
        }, // UPDATE: to connectorcreate
        // update: {
        //   ...formData,
        //   property_id: formData.property_id,
        //   agent_id: auth.userId,
        //   images: [],
        //   sold: false,
        //   extraFeatures: formData.extraFeatures.map((feature) => {
        //     return feature.text;
        //   }),
        //   Address: {
        //     create: {
        //       address: "ggf",
        //       street: "dffg",
        //       city: "ksdf",
        //       country: "asd",
        //       longitude: 123,
        //       latitude: 123,
        //     },
        //   },
        // }, // UPDATE: to connectorcreate,
      });
    } catch (error: any) {
      // Show error in console for Debugging (Realistically this should be logged used a package)
      console.log(error);
      // Respond with an Error for Client "error" state
      throw new Error("Something went wrong. Error: ", error);
    }
    if (!property) {
      throw new HTTPException(500, { message: "Error: Upserting property" });
    }

    // Response object
    return c.json(
      { results: property },
      {
        status: 200,
      }
    );
  }
);

export default app;
