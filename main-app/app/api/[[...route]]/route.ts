import { Hono } from "hono";
import { hc } from "hono/client";
import { logger } from "hono/logger";
import { handle } from "hono/vercel";

import userController from "../../../Server/controllers/userController";
import leadsController from "../../../Server/controllers/leadsController";
import imagesController from "../../../Server/controllers/imagesController";
import propertyController from "../../../Server/controllers/propertyController";
import insightsController from "../../../Server/controllers/insightsController";
import dashboardController from "../../../Server/controllers/dashboardController";
import { clerkMiddleware } from "@hono/clerk-auth";

// Increase performance by using either Drizzle, or Prisma Accelerate
// export const runtime = "edge";

const app = new Hono().basePath("/api").use(logger())

// Allows RPC features for User route
// TODO: Make all routes RPC
const routes = new Hono().route("/user", userController).route("/properties", propertyController);

// app.use(clerkMiddleware());
app.route("/user", userController);
app.route("/leads", leadsController);
app.route("/images", imagesController);
app.route("/insights", insightsController);
app.route("/properties", propertyController);
app.route("/dashboard", dashboardController);

export const GET = handle(app);
export const POST = handle(app);

export const honoClient = hc<typeof routes>("/api");
