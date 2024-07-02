"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import React, { useState, useEffect, createContext, useCallback } from "react";
import { ServerUser } from "@/Server/controllers/userController";
import { getServerUser } from "@/app/api/(userActions)/actions";

// Enabling TS features
export type UserContextType = {
  user?: ServerUser;
};

export const UserContext = createContext<UserContextType | null>(null);

// TODO: Test & implement
export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<ServerUser>();
  const { user: currentUser, isSignedIn } = useUser();

  const validateUser = useCallback(async (userId: string) => {
    const serverUser = await getServerUser(userId);
    console.log("Server User: ", serverUser);

    if (!serverUser) return SignIn;

    // TODO: Ensure user has valid Subscription to enter pages
    // TODO BEFORE Prod
    setUser(serverUser);
  }, []);

  useEffect(() => {
    if (!isSignedIn && !currentUser) return;
    validateUser(currentUser.id).catch((err) =>
      console.error("User Context Error: Fetching Server user failed")
    );
  }, [isSignedIn]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
