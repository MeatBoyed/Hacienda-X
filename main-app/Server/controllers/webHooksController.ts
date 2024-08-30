import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Hono } from "hono";
import { env } from "@/env";
import { HTTPException } from "hono/http-exception";
import crypto from "crypto";

const app = new Hono().post("/", async (c) => {
  // Get the headers
  const headerPayload = c.req.header();
  const svix_id = headerPayload["svix-id"];
  const svix_timestamp = headerPayload["svix-timestamp"];
  const svix_signature = headerPayload["svix-signature"];
  console.log(`Generated Headers: ID: ${svix_id} Timestamp: ${svix_timestamp} Signature: ${svix_signature}`);

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new HTTPException(400, {
      message: "Error occurred -- no svix headers",
    });
  }

  // Get the body
  // const body = await c.req.json();
  const body = await c.req.text();
  // console.log("Body:", body);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(env.WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  const signature = generateSignature(svix_id, svix_timestamp, body);

  //   // Get the ID and type
  // const { id } = evt.data;
  // const eventType = evt.type;

  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", body);

  return c.json({
    status: 200,
  });

  //   console.log("Running");

  //   if (!id) {
  //     return new Response("Error occured. UserId undefined in event data", {
  //       status: 400,
  //     });
  //   }

  //   switch (eventType) {
  //     case "user.created":
  //       console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  //       console.log("Webhook body:", body);

  //       // posthog.capture({
  //       //   distinctId: id,
  //       //   event: "user-signed-up",
  //       // });

  //       break;
  //     case "user.deleted":
  //       // Run Delete User func from DB

  //       posthog.capture({
  //         distinctId: id,
  //         event: "user-deleted-account",
  //       });
  //       break;
  //     case "user.updated":
  //       // run Update User func from DB
  //       break;
  //     case "session.created":
  //       // User logs in, track
  //       posthog.identify({
  //         distinctId: id,
  //       });
  //       break;
  //     case "session.ended":
  //       // User logs out end tracking
  //       break;
  //     default:
  //       return new Response(
  //         "Error occured. EventType doesn't match switch cases",
  //         {
  //           status: 400,
  //         }
  //       );
  //   }

  //   return new Response("", { status: 200 });
});

export default app;

export function generateSignature(svix_id: string, svix_timestamp: string, body: string) {
  // Construct the signed content
  const signedContent = `${svix_id}.${svix_timestamp}.${body}`;

  // Need to base64 decode the secret
  const secretBytes = Buffer.from(env.WEBHOOK_SECRET.split("_")[1], "base64"); // clerk env prefix
  const signature = crypto.createHmac("sha256", secretBytes).update(signedContent).digest("base64");
  console.log("Generated Signaute: ", signature);
  return signature;
}
