"use client";

import React, { FormEvent } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  SelectBathroomsOptions,
  SelectBedroomsOptions,
  SelectPriceOptions,
} from "@/lib/FormUtils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { coerce, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const SearchQueryParameterSchema = z.object({
  minPrice: z.coerce
    .number({ invalid_type_error: "Price range must be a number" })
    .optional(),
  maxPrice: z.coerce
    .number({ invalid_type_error: "Price range must be a number" })
    .optional(),
  bedrooms: z.coerce
    .number({ invalid_type_error: "Amount of Bedrooms must be a number" })
    .optional(),
  bathrooms: z.coerce
    .number({ invalid_type_error: "Amount of Bathrooms must be a number" })
    .optional(),
});

export default function SearchFilters({ onSubmit }: { onSubmit: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof SearchQueryParameterSchema>>({
    resolver: zodResolver(SearchQueryParameterSchema),
    defaultValues: {
      minPrice: parseInt(searchParams.get("minPrice") || "0"),
      maxPrice: parseInt(searchParams.get("maxPrice") || "0"),
      bedrooms: parseInt(searchParams.get("bedrooms") || "0"),
      bathrooms: parseInt(searchParams.get("bathrooms") || "0"),
    },
  });

  function submitHandler(values: z.infer<typeof SearchQueryParameterSchema>) {
    console.log("Submitted Form: ", values);
    const params = new URLSearchParams(searchParams);

    // Reset Params
    params.delete("price");
    params.delete("bedrooms");
    params.delete("bathrooms");
    params.delete("minPrice");
    params.delete("maxPrice");

    // Set new values
    if (values.minPrice && values.minPrice > 100000)
      params.set("minPrice", values.minPrice.toString());
    if (values.maxPrice && values.maxPrice > 100000)
      params.set("maxPrice", values.maxPrice.toString());
    if (values.bedrooms && values.bedrooms > 0)
      params.set("bedrooms", values.bedrooms.toString());
    if (values.bathrooms && values.bathrooms > 0)
      params.set("bathrooms", values.bathrooms.toString());

    console.log("Created Params: ", params.toString());
    router.replace(`${pathname}?${params.toString()}`);

    onSubmit();
  }

  return (
    <div className="flex justify-center items-center w-full">
      {/* Filter options */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="w-full h-full flex flex-col justify-center items-center gap-6"
        >
          <div className="flex flex-col justify-center items-start flex-wrap text-black w-full gap-4">
            {/* Bedroom */}
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bedroom</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Number of Bedrooms" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectLabel>Bedrooms</SelectLabel>
                          <SelectItem key={"0 Bedrooms"} value={"0"}>
                            Number of Bedrooms
                          </SelectItem>
                          {SelectBedroomsOptions.map((option) => (
                            <SelectItem key={option.key} value={option.value}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Bathrooms */}
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Number of Bathrooms" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectGroup>
                          <SelectLabel>Bathrooms</SelectLabel>
                          <SelectItem key={"0 Bathrooms"} value={"0"}>
                            Number of Bathrooms
                          </SelectItem>
                          {SelectBathroomsOptions.map((option) => (
                            <SelectItem key={option.key} value={option.value}>
                              {option.value}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center items-start flex-col gap-3 w-full">
              <FormLabel className="w-full">Price range</FormLabel>
              <div className="flex justify-center items-center  gap-4 w-full ">
                {/* Min Price */}
                <FormField
                  control={form.control}
                  name="minPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Min price range" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <SelectGroup>
                              <SelectLabel>Min Price</SelectLabel>
                              <SelectItem key={"0 Bathrooms"} value={"0"}>
                                Min price
                              </SelectItem>
                              {SelectPriceOptions.map((option) => (
                                <SelectItem
                                  key={option.key}
                                  value={option.value.toString()}
                                >
                                  R {option.value.toLocaleString()}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Max Price */}
                <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Max price range" />
                          </SelectTrigger>
                          <SelectContent className="">
                            <SelectGroup>
                              <SelectLabel>Max Price</SelectLabel>
                              <SelectItem value={"0"}>Max Price</SelectItem>
                              {SelectPriceOptions.map((option) => (
                                <SelectItem
                                  key={option.key}
                                  value={option.value.toString()}
                                >
                                  R {option.value.toLocaleString()}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex space-x-3">
            <Button
              type="button"
              onClick={() => {
                submitHandler({
                  bathrooms: 0,
                  bedrooms: 0,
                  maxPrice: 0,
                  minPrice: 0,
                });
              }}
              variant={"outline"}
              className="hover:bg-red-500 hover:text-white"
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="bg-accent hover:bg-blue-500 hover:text-white w-full shadow-md"
            >
              Apply filter
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
