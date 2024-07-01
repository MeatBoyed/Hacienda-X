"use client";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { Bookmark } from "lucide-react";
import React, { useState, useEffect, createContext, useContext } from "react";

// Enabling TS features
export type BookmarksContextType = {
  bookmarks: PropertyWithAddress[];
  isPropertySaved: (propertyId: string) => boolean;
  removePropertyFromBookmarks: (propertyId: string) => void;
  savePropertyToBookmarks: (property: PropertyWithAddress) => void;
};

const LOCALSTORAGE_NAME = "HACIENDA_X_BOOKMARKS";

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

export const BookmarksContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [bookmarks, setBookMarks] = useState<PropertyWithAddress[]>([]);

  useEffect(() => {
    let existing = localStorage.getItem(LOCALSTORAGE_NAME);
    if (existing) setBookMarks(JSON.parse(existing));
  }, []);

  // Check if Property is currently Saved
  function isPropertySaved(propertyId: string) {
    return bookmarks.find((prop) => prop.property_id === propertyId)
      ? true
      : false;
  }

  // Saves Property to Local Storage
  function savePropertyToBookmarks(property: PropertyWithAddress) {
    // Redirect to Remove if Property is already saved
    if (isPropertySaved(property.property_id))
      return removePropertyFromBookmarks(property.property_id);

    // update local storage
    setBookMarks((prev) => [...prev, property]);
    localStorage.setItem(
      LOCALSTORAGE_NAME,
      JSON.stringify([...bookmarks, property])
    );
  }

  // Removes Property to Local Storage
  function removePropertyFromBookmarks(propertyId: string) {
    setBookMarks(
      bookmarks.filter((property) => property.property_id !== propertyId)
    );
    localStorage.setItem(
      LOCALSTORAGE_NAME,
      JSON.stringify(
        bookmarks.filter((property) => property.property_id !== propertyId)
      )
    );
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isPropertySaved,
        savePropertyToBookmarks,
        removePropertyFromBookmarks,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

// Wrapper for Favouriting &  Saving properties
export function SavePropertyBTN({
  property,
  size,
}: {
  property: PropertyWithAddress;
  size?: number;
}) {
  const { savePropertyToBookmarks, isPropertySaved } = useContext(
    BookmarksContext
  ) as BookmarksContextType;

  const saved = isPropertySaved(property.property_id);

  return (
    <p
      style={{
        background: saved ? "#f472b6" : undefined,
        color: saved ? " #ffffff" : "#f472b6",
      }}
      className={"rounded-full border border-pink-400 p-1 bg-gray-300"}
      onClick={() => savePropertyToBookmarks(property)}
    >
      <Bookmark size={size || 18} className="" />
    </p>
  );
}
