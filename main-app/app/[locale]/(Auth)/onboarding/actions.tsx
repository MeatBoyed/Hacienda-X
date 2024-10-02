"use server";

import db from "@/Server/utils/db";

export async function getUser(userId: string) {
  return db.user.findUnique({ where: { public_id: userId } });
}
