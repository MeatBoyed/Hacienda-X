import { Hono } from "hono";
import db from "./db";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const properties = await db.property.findMany();
    console.log("HELLOO!: ", properties);

    return c.json(
      { results: properties },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    throw new Error("Something went wrong. Error: ", error);
  }
});

export default app;
