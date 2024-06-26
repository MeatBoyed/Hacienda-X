import { Hono } from "hono";
import { handle } from "hono/vercel";
import insightsController from "../(controllers)/insightsController";
import propertyController from "../(controllers)/propertyController";
import userController from "../(controllers)/userController";
import imagesController from "../(controllers)/imagesController";
import leadsController from "../(controllers)/leadsController";
import dashboardController from "../(controllers)/dashboardController";

// Increase performance by using either Drizzle, or Prisma Accelerate
// export const runtime = "edge";

const app = new Hono().basePath("/api");

// app.use(clerkMiddleware());
app.route("/properties", propertyController);
app.route("/dashboard", dashboardController);
app.route("/user", userController);
app.route("/leads", leadsController);
app.route("/insights", insightsController);
app.route("/images", imagesController);

export const GET = handle(app);
export const POST = handle(app);
