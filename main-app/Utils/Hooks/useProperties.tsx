"use client";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProperty, getAllProperties } from "../api/api";

export const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: async () => await getAllProperties(),
    queryKey: ["data"], //Array according to Documentation
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};
