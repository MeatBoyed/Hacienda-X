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
import { SelectBathroomsOptions, SelectBedroomsOptions } from "@/lib/FormUtils";
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
  price: z.coerce
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
      price: parseInt(searchParams.get("price") || "0"),
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

    // Set new values
    if (values.price && values.price > 0)
      params.set("bathrooms", values.price.toString());
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
          className="w-full h-full"
        >
          <div className="flex flex-col justify-center items-center flex-wrap text-black w-full gap-8">
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
            {/* <Label>Price</Label>
            <Select
              name="price"
              defaultValue={searchParams.get("price") || undefined}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0 - 50K</SelectItem>
                <SelectItem value="1">150K - 200K</SelectItem>
                <SelectItem value="2">250K - 500K</SelectItem>
                <SelectItem value="3">500K - 1M</SelectItem>
                <SelectItem value="4">1M+</SelectItem>
              </SelectContent>
            </Select> */}

            <div className="w-full flex space-x-3">
              <Button
                type="button"
                onClick={() => {
                  submitHandler({ bathrooms: 0, bedrooms: 0, price: 0 });
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
          </div>
        </form>
      </Form>
    </div>
  );
}
