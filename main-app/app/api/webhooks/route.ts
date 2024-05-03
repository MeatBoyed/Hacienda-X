import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import PostHogClient from "@/components/Posthog";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  const posthog = PostHogClient();

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload: unknown = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (!id) {
    return new Response("Error occured. UserId undefined in event data", {
      status: 400,
    });
  }

  switch (eventType) {
    case "user.created":
      console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
      console.log("Webhook body:", body);

      posthog.capture({
        distinctId: id,
        event: "user-signed-up",
      });
      break;
    case "user.deleted":
      // Run Delete User func from DB

      posthog.capture({
        distinctId: id,
        event: "user-deleted-account",
      });
      break;
    case "user.updated":
      // run Update User func from DB
      break;
    case "session.created":
      // User logs in, track
      posthog.identify({
        distinctId: id,
      });
      break;
    case "session.ended":
      // User logs out end tracking
      break;
    default:
      return new Response(
        "Error occured. EventType doesn't match switch cases",
        {
          status: 400,
        }
      );
  }

  return new Response("", { status: 200 });
}
