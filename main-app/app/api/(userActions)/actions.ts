"use client";
import { InferRequestType } from "hono";
import { honoClient } from "../[[...route]]/route";

export async function getServerUser(userId: string) {
  const res = await honoClient.user[":public_id"].$get({
    param: { public_id: userId },
  });
  if (res.ok) return await res.json();
}

const $post = honoClient.user.create.$post;
export const PostAgent = (arg: InferRequestType<typeof $post>) => async () =>
  await $post(arg).then(async (res) => await res.json());
