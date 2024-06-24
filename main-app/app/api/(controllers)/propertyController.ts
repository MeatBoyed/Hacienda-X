import { Hono } from "hono";
import db from "../(utils)/db";
import { HTTPException } from "hono/http-exception";
import {
  DeletePropertyRequestSchema,
  PropertySchema,
  parseFormData,
} from "@/lib/FormUtils";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { validator } from "hono/validator";
import { deleteImages, uploadFilesToS3 } from "./uploadFile";
import { zValidator } from "@hono/zod-validator";
import { AWS_S3_BASE_URL, PropertyWithAddress } from "../(utils)/utils";

const app = new Hono();

app.use(clerkMiddleware());

// Fetch All Products - Public Endpoint
app.get("/", async (c) => {
  try {
    // Database query (obvs)
    const properties = await db.property.findMany({
      where: { visibility: { not: "Deleted" } },
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

// Fetch Agent's Products - Private Endpoint
app.get("/dashboard/property", async (c) => {
  // Get the current user
  const auth = getAuth(c);

  // Ensure user is signed in
  if (!auth?.userId) {
    throw new Error("Unable to Authenticate user");
  }

  let properties: PropertyWithAddress[] = [];
  try {
    // Database query (obvs)
    properties = await db.property.findMany({
      where: { agent_id: auth.userId, visibility: { not: "Deleted" } },
      include: { Address: true },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error("Something went wrong. Error: ", error as Error);
  }

  // Response object
  return c.json(
    { results: properties },
    {
      status: 200,
    }
  );
});

// Fetch Agent's Specific Product - Private Endpoint
app.get("/dashboard/property/:propertyid", async (c) => {
  // Get the current user
  const auth = getAuth(c);

  // Ensure user is signed in
  if (!auth?.userId) {
    throw new Error("Unable to Authenticate user");
  }

  const propertyId = c.req.param("propertyid");

  let property: PropertyWithAddress;
  try {
    // Database query (obvs)
    property = await db.property.findFirstOrThrow({
      where: {
        agent_id: auth.userId,
        property_id: propertyId,
        visibility: { not: "Deleted" },
      }, // Property needs a Slug field in DB
      include: { Address: true },
    });
  } catch (error: any) {
    console.log(error);
    throw new HTTPException(500, { message: "An unexpected error occured" });
  }
  // Let the Client (Front-End) decide what to do with a 404
  if (!property || property.visibility === "Deleted") {
    return c.json({ results: undefined, notFound: true }, { status: 200 });
  }

  // Response object
  return c.json(
    { results: property },
    {
      status: 200,
    }
  );
});

// Fetch Specific Product - Public Endpoint
app.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  let property: PropertyWithAddress;
  try {
    // Database query (obvs)
    property = await db.property.findFirstOrThrow({
      where: { title: slug, visibility: { not: "Deleted" } }, // Property needs a Slug field in DB
      include: { Address: true },
    });
  } catch (error: any) {
    console.log("Error: ", error as Error);
    throw new HTTPException(500, { message: "An unexpected error occured" });
  }
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

// Images are Uploaded via the backend to better Identify
// Create Product - Private Endpoint
app.post(
  "/create",
  // Validates the Incoming data is the correct type through Zod validation schema
  validator("form", (value, c) => {
    const parsed = parseFormData(value);
    if (!parsed) {
      return c.text("Invalid!", 401);
    }
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

    // Upload image process

    const imageUpload = await uploadFilesToS3(auth.userId, prop.images); // Url format: https:<aws-domain>/<userId>/<unique-uuid>
    console.log("Uploaded Images - ", imageUpload);

    let property: PropertyWithAddress;

    try {
      // Database query (obvs)
      property = await db.property.create({
        data: {
          title: prop.title,
          description: prop.description,
          price: prop.price,
          bathrooms: prop.bathrooms,
          bedrooms: prop.bedrooms,
          pool: prop.pool,
          saleType: prop.saleType,
          visibility: prop.visibility,
          agent_id: auth.userId,
          images: imageUpload.uploadedImages.map((image) => image.url),
          sold: false,
          extraFeatures: prop.extraFeatures,
          Address: {
            create: {
              address: prop.address,
              latitude: prop.lat,
              longitude: prop.lng,
            },
          },
        },
        include: { Address: true },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong. Error: ", error as Error);
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

// Update Product - Private Endpoint
app.post(
  "/update",
  // Validates the Incoming data is the correct type through Zod validation schema
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

    if (prop.deletedImages) {
      try {
        await deleteImages(prop.deletedImages);
      } catch (err) {
        throw new HTTPException(500, {
          message: `Unable to delete images. Error: ${err as Error}`,
        });
      }
    }

    // Upload image process
    let images: string[] = [];
    if (prop.images && prop.imagesOrder) {
      try {
        const res = await uploadFilesToS3(auth.userId, prop.images); // Url format: https:<aws-domain>/<userId>/<unique-uuid>
        if (res.failedImages.length > 0) {
          await deleteImages(res.uploadedImages.map((image) => image.url));
          throw new HTTPException(500, {
            message: "Failed objects found in upload",
          });
        }
        prop.imagesOrder.forEach((imageId) => {
          if (imageId.startsWith(AWS_S3_BASE_URL)) {
            return images.push(imageId);
          }
          res.uploadedImages.forEach((image) => {
            if (image.fileName === imageId) return images.push(image.url);
          });
        });
      } catch (err) {
        throw new HTTPException(500, {
          message: `Unable to Upload images. Error: ${err as Error}`,
        });
      }
    }

    let property: PropertyWithAddress | undefined;

    try {
      // Database query (obvs)
      property = await db.property.update({
        where: { property_id: prop.property_id },
        data: {
          title: prop.title,
          description: prop.description,
          price: prop.price,
          bathrooms: prop.bathrooms,
          bedrooms: prop.bedrooms,
          pool: prop.pool,
          saleType: prop.saleType,
          visibility: prop.visibility,
          agent_id: auth.userId,
          images: images,
          sold: false,
          extraFeatures: prop.extraFeatures,
          Address: {
            update: {
              address: prop.address,
              latitude: prop.lat,
              longitude: prop.lng,
            },
          },
        },
        include: { Address: true },
      });
    } catch (error: any) {
      throw new Error("Something went wrong. Error: ", error as Error);
    }
    if (!property) {
      throw new HTTPException(500, { message: "Error: Upserting property" });
    }

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

// Delete Product - Private Endpoint
app.post(
  "/delete/:slug",
  // Validates the Incoming data is the correct type through Zod validation schema
  zValidator("json", DeletePropertyRequestSchema),
  async (c) => {
    // Get the current user
    const auth = getAuth(c);

    // Ensure user is signed in
    if (!auth?.userId) {
      console.log("Unable to authenticate user");
      throw new HTTPException(401);
    }

    const slug = c.req.param("slug"); // PropertyId
    const deletePayload = c.req.valid("json");

    if (
      auth.userId !== deletePayload.userId &&
      deletePayload.propertyId === "" &&
      slug !== deletePayload.propertyId
    )
      throw new Error("Unable to verify request");

    // Full Deleting of Property requires Deleting Property's Address, and (Disconnecting) Leads, then deleting property
    try {
      // Get Property
      // const property = await db.property.findFirstOrThrow({ where: { property_id: slug, agent_id: auth.userId }, select: { Address: true, property_id: true}})

      // Delete Address
      // await db.address.delete({ where: { address_id: property.Address?.address_id, property_id: property.property_id }})

      await db.property.update({
        where: {
          property_id: slug,
          agent_id: auth.userId,
        },
        data: { visibility: "Deleted" },
      });
    } catch (error: any) {
      throw new Error("Something went wrong. Error: ", error as Error);
    }

    try {
      await deleteImages(deletePayload.images);
    } catch (error) {
      throw new HTTPException(500, {
        message: `Unable to delete images. Error: ${error as Error}`,
      });
    }

    console.log("Deleted!");

    // Response object
    return c.json(
      { results: undefined },
      {
        status: 200,
      }
    );
  }
);

export type AppType = typeof app;

export default app;
