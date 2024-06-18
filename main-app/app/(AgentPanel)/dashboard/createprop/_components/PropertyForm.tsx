"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tag, TagInput } from "emblor";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye } from "lucide-react";
import { PuffLoader } from "react-spinners";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  PropertySchema,
  SelectBedroomsOptions,
  SelectBathroomsOptions,
  SelectVisibilityOptions,
  SelectSaleTypeOptions,
  MAXFILES,
  propertyToFormData,
} from "../../../../../lib/FormUtils";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { AddressInput } from "../../../../../components/AddressInput";
import { ImagesInput } from "@/components/ImagesInput";
import { PostCreateProperty } from "@/lib/RequestUtils";

export default function PropertyForm() {
  const form = useForm<z.infer<typeof PropertySchema>>({
    resolver: zodResolver(PropertySchema),
    defaultValues: {
      property_id: "",
      title: "ye ye ye",
      price: 90839,
      description: "kjskdfjk aksdjf ksdfksadf ",
      bathrooms: 2,
      bedrooms: 3,
      pool: false,
      images: [],
      extraFeatures: [],
      address: "asdjjsdf",
      lat: 0,
      lng: 0,
      visibility: "Public",
      saleType: "Sale",
    },
  });
  const { setValue, getValues, formState, getFieldState } = form;
  // console.log("Values: ", getValues());
  // console.log("Errors: ", formState.errors);

  // Extra Features's Tag management
  const [extras, setExtras] = useState<Tag[]>([]);
  const [activeExtraTagIndex, setActiveExtraTagIndex] = useState<number | null>(
    null
  );

  const { trigger, isMutating, data } = useSWRMutation(
    "/api/properties/create",
    PostCreateProperty /* options */,
    {
      onError: () => {
        toast.error("Something unexpected happend.", {
          description: "Please try again....",
        });
      },
      onSuccess: (data) => {
        // Posthog Action
        // const posthog = PostHogClient();
        // posthog.identify({
        //   distinctId: userId, // replace with a user's distinct ID
        //   properties: { role: role },
        // });
        console.log("Response Data: ", data);

        // Show message
        toast.success("Your property has been posted!", {
          description: `View your property at ....`,
        });
      },
    }
  );

  async function submitHandler(values: z.infer<typeof PropertySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Hello!");
    console.log(values);

    await trigger({ property: values });
  }

  if (isMutating) {
    <div className="w-full h-100vh flex justify-center items-center">
      <PuffLoader />
    </div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="">
        <div className="flex items-center justify-between w-full">
          <div className="flex justify-center items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7 bg-white">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create Property
            </h1>
            <div className="border h-8 px-2 py-2 flex justify-center items-center gap-3 rounded-md">
              <Eye size={20} />
              <p className="text-sm font-medium">Public</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:ml-auto md:flex ">
            <Button variant="destructive" size="sm">
              Discard
            </Button>
            <Button variant="outline" size="sm" type="submit">
              Save Product
            </Button>
          </div>
        </div>
        <div className="grid gap-4 mt-8 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>
                  Easily add your property in 5 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full"
                            type="text"
                            placeholder="Give your property a title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input className="w-full" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Description */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-32"
                            placeholder="Describe your property. Let your words flow"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <AddressInput
                            name={field.name}
                            className="w-full"
                            handleChange={(placeResult) => {
                              setValue("address", placeResult.address);
                              setValue("lat", placeResult.lat);
                              setValue("lng", placeResult.lng);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            {/* Property Features */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {/* Images */}
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormMessage />
                      <FormControl>
                        <ImagesInput
                          handleChange={(files) => {
                            console.log("Images: ", files);
                            setValue("images", files);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            {/* Meta Data Fields */}
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Meta Details</CardTitle>
                <CardDescription>
                  Easily add your property in 5 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {/* Visability*/}
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visability</FormLabel>
                        <FormControl>
                          <Select
                            key="visability"
                            value={field.value.toString()}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Number of Bathrooms" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectGroup>
                                <SelectLabel>visibility</SelectLabel>
                                {SelectVisibilityOptions.map((option) => (
                                  <SelectItem
                                    key={option.key}
                                    value={option.value}
                                  >
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
                  {/* Sale Type */}
                  <FormField
                    control={form.control}
                    name="saleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Select
                            key="saleType"
                            value={field.value.toString()}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Number of Bathrooms" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectGroup>
                                <SelectLabel>Sale Type</SelectLabel>
                                {SelectSaleTypeOptions.map((option) => (
                                  <SelectItem
                                    key={option.key}
                                    value={option.value}
                                  >
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
                </div>
              </CardContent>
            </Card>
            {/* Property Features */}
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {/* Bedroom */}
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedroom</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value.toString()}
                          onValueChange={field.onChange}
                          //   defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Number of Bedrooms" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              <SelectLabel>Bedrooms</SelectLabel>
                              {SelectBedroomsOptions.map((option) => (
                                <SelectItem
                                  key={option.key}
                                  value={option.value}
                                >
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
                    <FormItem>
                      <FormLabel>Bedroom</FormLabel>
                      <FormControl>
                        <Select
                          key="bathrooms"
                          value={field.value.toString()}
                          onValueChange={field.onChange}
                          //   defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Number of Bathrooms" />
                          </SelectTrigger>
                          <SelectContent className="w-full">
                            <SelectGroup>
                              <SelectLabel>Bathrooms</SelectLabel>
                              {SelectBathroomsOptions.map((option) => (
                                <SelectItem
                                  key={option.key}
                                  value={option.value}
                                >
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
                {/* Pool */}
                <FormField
                  control={form.control}
                  name="pool"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-start items-center gap-8">
                        <FormLabel>Pool</FormLabel>
                        <FormControl>
                          <Switch
                            className="data-[state=checked]:bg-accent"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Extra Features */}
                <FormField
                  control={form.control}
                  name="extraFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extra Features</FormLabel>
                      <FormControl>
                        <TagInput
                          {...field}
                          clearAll
                          variant="Primary"
                          sortTags={true}
                          includeTagsInInput={false}
                          activeTagIndex={activeExtraTagIndex}
                          setActiveTagIndex={setActiveExtraTagIndex}
                          placeholder="Enter a feature"
                          tags={extras}
                          className="sm:min-w-[450px] w-full "
                          setTags={(newTags) => {
                            setExtras(newTags);
                            setValue(
                              "extraFeatures",
                              newTags as [Tag, ...Tag[]]
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}

// export function CreateProperty() {
//   const { handleSubmit, isMutating } = usePropertyForm();

//   return (
//     <>
//       {isMutating && (
//         <div className="flex justify-center items-center w-full py-20">
//           <div className="wrapper flexCenter" style={{ height: "60vh" }}>
//             <PuffLoader
//               //   height={80}
//               //   width="80"
//               //   radius={1}
//               color="#4066ff"
//               aria-label="puff-loading"
//             />
//           </div>
//         </div>
//       )}
//       {!isMutating && <PropertyForm onSubmit={handleSubmit} />}
//     </>
//   );
// }
