import { Hono } from "hono";
import { handle } from "hono/vercel";
import insightsController from "../../../Server/controllers/insightsController";
import propertyController from "../../../Server/controllers/propertyController";
import userController from "../../../Server/controllers/userController";
import imagesController from "../../../Server/controllers/imagesController";
import leadsController from "../../../Server/controllers/leadsController";
import dashboardController from "../../../Server/controllers/dashboardController";
import { HTTPException } from "hono/http-exception";
import { hc } from "hono/client";

// Increase performance by using either Drizzle, or Prisma Accelerate
// export const runtime = "edge";

const app = new Hono().basePath("/api");

// Allows RPC features for User route
// TODO: Make all routes RPC
const routes = new Hono().route("/user", userController);
const userApp = new Hono().basePath("/api").route("/", routes);

// app.use(clerkMiddleware());
app.route("/properties", propertyController);
app.route("/dashboard", dashboardController);
app.route("/user", userController);
app.route("/leads", leadsController);
app.route("/insights", insightsController);
app.route("/images", imagesController);

export const GET = handle(app);
export const POST = handle(app);

export const honoClient = hc<typeof routes>("/api");
