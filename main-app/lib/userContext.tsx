"use client";
import { useUser } from "@clerk/nextjs";
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { honoClient } from "@/app/api/[[...route]]/route";
import { ServerUser } from "@/Server/controllers/userController";

// Enabling TS features
export type UserContextType = {
  user?: ServerUser;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<ServerUser>();
  const { user: currentUser, isSignedIn } = useUser();

  const fetchData = useCallback(async (userId: string) => {
    const $get = honoClient.user[":public_id"].$get;
    const res = await $get({
      param: { public_id: userId },
    });
    if (res.ok) {
      const data: ServerUser = await res.json();
      setUser(data);
    }
  }, []);

  useEffect(() => {
    if (!isSignedIn && !currentUser) return;
    fetchData(currentUser.id).catch((err) =>
      console.error("User Context Error: Fetching Server user failed")
    );
    // Make DB query
    // setUser(dbUser);
    // Set dB user to User obj
  }, [isSignedIn]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
