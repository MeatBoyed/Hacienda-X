import { Hono } from "hono";
import { handle } from "hono/vercel";
import propertyController from "./propertyController";
import userController from "./userController";
import { clerkMiddleware } from "@hono/clerk-auth";

// Increase performance by using either Drizzle, or Prisma Accelerate
// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use("*", clerkMiddleware());
app.route("/properties", propertyController);
app.route("/user", userController);
// app.route("/webhooks", webhooks);

export const GET = handle(app);
export const POST = handle(app);
