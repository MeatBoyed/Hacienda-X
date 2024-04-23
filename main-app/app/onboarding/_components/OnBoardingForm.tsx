"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const propertySchema = z.object({
  role: z.string(),
  clerkId: z.string(),
  publicUsername: z.string(),
  about: z.string(),
});

export default function OnBoardingForm() {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      role: "",
      clerkId: "",
      publicUsername: "",
      about: "",
    },
  });

  function onSubmit(values: z.infer<typeof propertySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full text-black">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Role" {...field} />
                </FormControl>
                <FormDescription>Enter Your Role</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Public Username</FormLabel>
                <FormControl>
                  <Input placeholder="Public Username" {...field} />
                </FormControl>
                <FormDescription>Enter Your Public Username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Input placeholder="About" {...field} />
                </FormControl>
                <FormDescription>Enter the About</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
