import { Hono } from "hono";
import { handle } from "hono/vercel";
import { hc } from "hono/client";

import userController from "../../../Server/controllers/userController";
import leadsController from "../../../Server/controllers/leadsController";
import imagesController from "../../../Server/controllers/imagesController";
import propertyController from "../../../Server/controllers/propertyController";
import insightsController from "../../../Server/controllers/insightsController";
import dashboardController from "../../../Server/controllers/dashboardController";

// Increase performance by using either Drizzle, or Prisma Accelerate
// export const runtime = "edge";

const app = new Hono().basePath("/api");

// Allows RPC features for User route
// TODO: Make all routes RPC
const routes = new Hono()
  .route("/user", userController)
  .route("/properties", propertyController);
const userApp = new Hono().basePath("/api").route("/", routes);

// app.use(clerkMiddleware());
app.route("/user", userController);
app.route("/properties", propertyController);
app.route("/dashboard", dashboardController);
app.route("/leads", leadsController);
app.route("/insights", insightsController);
app.route("/images", imagesController);

export const GET = handle(app);
export const POST = handle(app);

export const honoClient = hc<typeof routes>("/api");
