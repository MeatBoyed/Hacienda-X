"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tag, TagInput } from "emblor";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import { PuffLoader } from "react-spinners";

import { z } from "zod";
import { useContext, useState, use, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  PropertySchema,
  SelectBedroomsOptions,
  SelectBathroomsOptions,
  SelectVisibilityOptions,
  SelectSaleTypeOptions,
  MAXFILES,
  MINFILES,
} from "../../../../../../lib/FormUtils";
import useSWRMutation from "swr/mutation";
import { toast } from "sonner";
import { AddressInput } from "../../../../../../components/AddressInput";
import { ImagesInput } from "@/components/ImagesInput/ImagesInput";
import { DeleteProperty, PostProperty } from "@/lib/RequestUtils";
import { PropertyWithAddress } from "@/Server/utils/utils";
import { useRouter } from "next/navigation";
import { UserContext, UserContextType } from "@/lib/userContext";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import PropertyFormHead from "./PropertyFormHead";

export default function PropertyForm({ initProperty }: { initProperty?: PropertyWithAddress }) {
  const t = useTranslations("Dashboard.propertyFormComp");
  const router = useRouter();
  const { user } = useContext(UserContext) as UserContextType;

  const defaultValues = getDefaultVaules(initProperty);
  const form = useForm<z.infer<typeof PropertySchema>>({
    resolver: zodResolver(PropertySchema),
    defaultValues: defaultValues,
  });
  const {
    setValue,
    getValues,
    setError,
    formState: { errors, isDirty, isSubmitted },
  } = form;
  // console.log("Values: ", getValues());

  useEffect(() => {
    if (isDirty && isSubmitted)
      Object.entries(errors).forEach(([key, value]) => {
        toast.error("Oops! Seems you've entered something wrong.", {
          description: value.message,
          duration: 10000,
        });
      });
  }, [errors, isDirty, isSubmitted]);

  // Extra Features's Tag management
  const [activeExtraTagIndex, setActiveExtraTagIndex] = useState<number | null>(null);

  const {
    trigger: triggerCreate,
    isMutating: isMutatingCreate,
    error: createError,
  } = useSWRMutation("/api/dashboard/property/create", PostProperty /* options */, {
    onError: (error) => {
      console.log("Server Error Occured: ", error);
      toast.error("Something unexpected happend.", {
        description: "Please try again....",
      });
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.error === "Image is required") {
        toast.error("Ooops! Looks like you forgot to add images.", {
          description: "You must upload at least 2 Images for your post.",
          duration: 500000,
        });
        return;
      }
      if (data.error === "Unable to upload image") {
        toast.error("Ooops! Something went wrong when uploading your images. Please try again", {
          duration: 500000,
        });
        return;
      }

      if (data) {
        // Show message
        toast.success("Your property has been posted!", {
          description: `View your property at ....`,
        });
        router.replace(`/dashboard/property/${data.property_id}`);
      }
    },
  });

  const {
    trigger: triggerUpdate,
    isMutating: isMutatingUpdate,
    error: updateError,
  } = useSWRMutation("/api/dashboard/property/update", PostProperty /* options */, {
    onError: (error) => {
      console.log("SERVER RESPONSE ERROR: ", error);
      toast.error("Something unexpected happend.", {
        description: "Please try again....",
      });
    },
    onSuccess: (data: PropertyWithAddress) => {
      const createdProp: z.infer<typeof PropertySchema> = {
        property_id: data.property_id,
        title: data.title,
        price: data.price,
        description: data.description,
        bathrooms: data.bathrooms,
        bedrooms: data.bedrooms,
        squareMeter: data.squareMeter ? data.squareMeter : 0, // TODO: Remove Square Meter being an optional field
        pool: data.pool,
        images: data.images,
        extraFeatures: data.extraFeatures.map((feat, i) => ({
          id: i.toString(),
          text: feat,
        })),
        address: data.Address ? data.Address.address : "",
        lat: data.Address ? data.Address.latitude : 0,
        lng: data.Address ? data.Address.longitude : 0,
        visibility: data.visibility,
        saleType: data.saleType,
      };

      // Set result (property) value to the Form's state, convert object values..
      form.reset(createdProp);

      // Show message
      toast.success("Your property has been Updated!", {
        description: `View your property at ....`,
      });
    },
  });

  const { trigger: triggerDelete, isMutating: isMutatingDelete } = useSWRMutation(
    `/api/dashboard/property/delete/${initProperty?.property_id || ""}`,
    DeleteProperty /* options */,
    {
      onError: () => {
        toast.error("Something unexpected happend.", {
          description: "Please try again....",
        });
      },
      onSuccess: (data) => {
        // Show message
        toast.success("Your property has been Deleted!");
      },
    }
  );

  async function submitHandler(values: z.infer<typeof PropertySchema>) {
    console.log("Submitted Form: ", values);

    if (!initProperty) {
      if (values.images.length < MINFILES) {
        setError("images", {
          message: `There must be at least ${MINFILES} Image.`,
        });
        return;
      }

      await triggerCreate({ property: values });
    } else {
      if (values.imagesOrder && values.imagesOrder.length < MINFILES) {
        setError("images", {
          message: `There must be at least ${MINFILES} Image.`,
        });
        return;
      }

      await triggerUpdate({
        property: values,
      });
    }
  }

  async function deleteHandler() {
    if (!initProperty || !user) return;

    await triggerDelete({
      payload: {
        propertyId: initProperty.property_id,
        userId: user.public_id,
        images: initProperty.images,
      },
    });
    router.push("/dashboard/property");
  }

  return (
    <>
      {isMutatingCreate || isMutatingUpdate || isMutatingDelete ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <PuffLoader color="blue" />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="h-full w-full flex justify-start items-center flex-col gap-12"
          >
            {/* Head (Action Btns) */}
            <PropertyFormHead deleteHandler={deleteHandler} initProperty={!!initProperty} />

            {/* Form Inputs */}
            {/* <div className="flex justify-start items-center w-full gap-10 flex-col sm:flex-row sm:items-start  sm:px-5 lg:max-w-7xl"> */}
            <div className="grid grid-cols-1 w-full gap-10 sm:grid-cols-2 sm:items-start sm:px-5 lg:max-w-7xl">
              <div className="flex flex-col justify-center items-center w-full gap-5">
                {/* Core fields */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                    <CardDescription>Create your new property now!</CardDescription>
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
                              <Input className="w-full" type="text" placeholder="Give your property a title" {...field} />
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
                                defaultValue={field.value}
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
                {/* Image Input */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                    <CardDescription>Upload at least {MINFILES} image for your property.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    {/* Images */}
                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => (
                        <FormItem>
                          <FormMessage />
                          <FormControl className="px-2 pb-4">
                            <ImagesInput
                              maxFiles={MAXFILES}
                              maxSize={5 * 1024 * 1024}
                              defaultValues={initProperty ? field.value : []}
                              handleChange={(uploadedImages, deletedImages) => {
                                console.log("Images: ", uploadedImages);
                                if (initProperty) {
                                  if (deletedImages) setValue("deletedImages", deletedImages);
                                  setValue("imagesOrder", uploadedImages.order); // Store File Order
                                }
                                setValue("images", uploadedImages.newImages); // Stores Uploaded Files
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col-reverse sm:flex-col justify-center items-center w-full gap-5">
                {/* Meta Data Fields */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Meta Data</CardTitle>
                    <CardDescription>Manage the Visability, and Sale Type.</CardDescription>
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
                      {/* Sale Type */}
                      <FormField
                        control={form.control}
                        name="saleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sale Type</FormLabel>
                            <FormControl>
                              <Select
                                key="saleType"
                                value={field.value.toString()}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Sale type" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                  <SelectGroup>
                                    <SelectLabel>Sale Type</SelectLabel>
                                    {SelectSaleTypeOptions.map((option) => (
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
                    </div>
                  </CardContent>
                </Card>
                {/* Property Features */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                    <CardDescription>Unique features for your property!</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    {/* Square Meter */}
                    <FormField
                      control={form.control}
                      name="squareMeter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Square Meters</FormLabel>
                          <FormControl>
                            <Input className="w-full" type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Bedroom */}
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Select value={field.value.toString()} onValueChange={field.onChange}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Number of Bedrooms" />
                              </SelectTrigger>
                              <SelectContent className="">
                                <SelectGroup>
                                  <SelectLabel>Bedrooms</SelectLabel>
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
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Select key="bathrooms" value={field.value.toString()} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Number of Bathrooms" />
                              </SelectTrigger>
                              <SelectContent className="w-full">
                                <SelectGroup>
                                  <SelectLabel>Bathrooms</SelectLabel>
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
                              customTagRenderer={(tag, isActiveTag) => (
                                <Badge
                                  key={tag.id}
                                  className="flex justify-center items-center gap-4 border bg-slate-100 rounded-md shadow-md text-black hover:cursor-pointer"
                                >
                                  <p className="leading-7">{tag.text}</p>
                                  <XCircle
                                    onClick={() =>
                                      setValue(
                                        "extraFeatures",
                                        form.getValues("extraFeatures").filter((t) => tag.id != t.id)
                                      )
                                    }
                                    size={18}
                                  />
                                </Badge>
                              )}
                              variant="Primary"
                              sortTags={true}
                              includeTagsInInput={false}
                              activeTagIndex={activeExtraTagIndex}
                              setActiveTagIndex={setActiveExtraTagIndex}
                              placeholder="Enter a feature"
                              minTags={3}
                              tags={field.value}
                              className=" w-full overflow-auto "
                              setTags={(newTags) => {
                                // setExtras(newTags);
                                setValue("extraFeatures", newTags as [Tag, ...Tag[]]);
                              }}
                            />
                          </FormControl>
                          <FormDescription>(Press Enter to add)</FormDescription>
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
      )}
    </>
  );
}

function getDefaultVaules(initProperty: PropertyWithAddress | undefined) {
  return {
    property_id: initProperty?.property_id || "",
    title: initProperty?.title || "",
    price: initProperty?.price || 0,
    description: initProperty?.description || "",
    bathrooms: initProperty?.bathrooms || 0,
    bedrooms: initProperty?.bedrooms || 0,
    squareMeter: initProperty?.squareMeter || 0,
    pool: initProperty?.pool || false,
    images: initProperty?.images || [],
    extraFeatures:
      initProperty?.extraFeatures.map((feature, index) => ({
        id: index.toString(),
        text: feature,
      })) || [],
    address: initProperty?.Address?.address || "",
    lat: initProperty?.Address?.latitude || 0,
    lng: initProperty?.Address?.longitude || 0,
    visibility: initProperty?.visibility || "Public",
    saleType: initProperty?.saleType || "Sale",
  };
}
