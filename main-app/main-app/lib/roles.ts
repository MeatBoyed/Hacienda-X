import { env } from "@/env";
import { GetUser, UserServiceResponse } from "@/Server/lib/UserService";
import { Roles } from "@/types/globals";
import { auth, currentUser } from "@clerk/nextjs/server";

export const verifyUser = async (): Promise<Boolean> => {
  // Check if user is logged in (clerk)
  const user = await currentUser();
  if (!user) {
    return false;
  }

  // Call API using user's ID
  // const serverUser = await fetchUser(user.id);
  const userResponse = await GetUser(user.id);
  if (userResponse.err) return false;

  return true;
};
