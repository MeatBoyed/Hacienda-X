import { Hono } from "hono";
import { handle } from "hono/vercel";
import propertyController from "./propertyController";

// Increase performance by using either Drizzle, or Prisma Accelerate
// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/properties", propertyController);

export const GET = handle(app);
export const POST = handle(app);
