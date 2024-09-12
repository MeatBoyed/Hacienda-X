"use client";
import { useState, useEffect, useCallback } from "react";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { toast } from "sonner";

const LOCALSTORAGE_NAME = "HACIENDA_X_BOOKMARKS";

export function useBookmarkService() {
  const [bookmarks, setBookmarks] = useState<PropertyWithAddress[]>([]);

  const getBookmarks = useCallback((): PropertyWithAddress[] => {
    if (typeof window !== "undefined") {
      const storedBookmarks = localStorage.getItem(LOCALSTORAGE_NAME);
      if (storedBookmarks) {
        return JSON.parse(storedBookmarks);
      }
    }
    return [];
  }, []);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, [getBookmarks]);

  const addBookmark = useCallback(
    (property: PropertyWithAddress): void => {
      const updatedBookmarks = [...getBookmarks(), property];
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      toast.success("Property added to bookmarks");
    },
    [getBookmarks]
  );

  const removeBookmark = useCallback(
    (propertyId: string): void => {
      const currentBookmarks = getBookmarks();
      const updatedBookmarks = currentBookmarks.filter(
        (property) => property.property_id !== propertyId
      );
      localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(updatedBookmarks));
      setBookmarks(updatedBookmarks);
      toast.success("Property removed from bookmarks");
    },
    [getBookmarks]
  );

  const isBookmarked = useCallback(
    (propertyId: string): boolean => {
      return getBookmarks().some((property) => property.property_id === propertyId);
    },
    [getBookmarks]
  );

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
  };
}
