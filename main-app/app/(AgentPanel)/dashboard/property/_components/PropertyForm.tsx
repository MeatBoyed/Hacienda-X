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
import { ChevronLeft, Eye, Save, Trash2 } from "lucide-react";
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
import {
  DeleteImage,
  DeleteImageResponse,
  DeleteProperty,
  PostProperty,
  PostPropertyResponse,
} from "@/lib/RequestUtils";
import {
  PropertyWithAddress,
  SelectPropertyResponse,
} from "@/app/api/(utils)/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import image from "next/image";

export default function PropertyForm({
  initProperty,
}: {
  initProperty?: SelectPropertyResponse;
}) {
  const { user } = useUser();
  const router = useRouter();

  const defaultValues: z.infer<typeof PropertySchema> = {
    property_id: initProperty ? initProperty.results.property_id : "",
    title: initProperty ? initProperty.results.title : "",
    price: initProperty ? initProperty.results.price : 0,
    description: initProperty ? initProperty.results.description : "",
    bathrooms: initProperty ? initProperty.results.bathrooms : 0,
    bedrooms: initProperty ? initProperty.results.bedrooms : 0,
    pool: initProperty ? initProperty.results.pool : false,
    images: initProperty ? initProperty.results.images : [],
    extraFeatures: initProperty
      ? initProperty.results.extraFeatures.map((feature, index) => ({
          id: index.toString(),
          text: feature,
        }))
      : [],
    address:
      initProperty && initProperty.results.Address
        ? initProperty.results.Address?.address
        : "",
    lat:
      initProperty && initProperty.results.Address
        ? initProperty.results.Address?.latitude
        : 0,
    lng:
      initProperty && initProperty.results.Address
        ? initProperty.results.Address.longitude
        : 0,
    visibility: initProperty ? initProperty.results.visibility : "Public",
    saleType: initProperty ? initProperty.results.saleType : "Sale",
  };
  const form = useForm<z.infer<typeof PropertySchema>>({
    resolver: zodResolver(PropertySchema),
    defaultValues: defaultValues,
  });
  const { setValue, getValues, formState } = form;
  console.log("Values: ", getValues());
  console.log("Errors: ", formState.errors);

  // Extra Features's Tag management
  // const [extras, setExtras] = useState<Tag[]>([]);
  const [activeExtraTagIndex, setActiveExtraTagIndex] = useState<number | null>(
    null
  );

  const {
    trigger: triggerCreate,
    isMutating: isMutatingCreate,
    error: createError,
  } = useSWRMutation("/api/properties/create", PostProperty /* options */, {
    onError: () => {
      toast.error("Something unexpected happend.", {
        description: "Please try again....",
      });
    },
    onSuccess: (data: PostPropertyResponse) => {
      // Show message
      toast.success("Your property has been posted!", {
        description: `View your property at ....`,
      });
      router.push(`/dashboard/property/${data.results.property_id}`);
    },
  });

  const {
    trigger: triggerUpdate,
    isMutating: isMutatingUpdate,
    error: updateError,
  } = useSWRMutation("/api/properties/update", PostProperty /* options */, {
    onError: (error) => {
      console.log("SERVER RESPONSE ERROR: ", error);
      toast.error("Something unexpected happend.", {
        description: "Please try again....",
      });
    },
    onSuccess: (data: PostPropertyResponse) => {
      const createdProp: z.infer<typeof PropertySchema> = {
        property_id: data.results.property_id,
        title: data.results.title,
        price: data.results.price,
        description: data.results.description,
        bathrooms: data.results.bathrooms,
        bedrooms: data.results.bedrooms,
        pool: data.results.pool,
        images: data.results.images,
        extraFeatures: data.results.extraFeatures.map((feat, i) => ({
          id: i.toString(),
          text: feat,
        })),
        address: data.results.Address ? data.results.Address.address : "",
        lat: data.results.Address ? data.results.Address.latitude : 0,
        lng: data.results.Address ? data.results.Address.longitude : 0,
        visibility: data.results.visibility,
        saleType: data.results.saleType,
      };

      // Set result (property) value to the Form's state, convert object values..
      form.reset(createdProp);

      // Show message
      toast.success("Your property has been Updated!", {
        description: `View your property at ....`,
      });
    },
  });

  const {
    trigger: triggerDelete,
    isMutating: isMutatingDelete,
    error: deleteError,
  } = useSWRMutation(
    `/api/properties/delete/${
      initProperty ? initProperty.results.property_id : ""
    }`,
    DeleteProperty /* options */,
    {
      onError: () => {
        toast.error("Something unexpected happend.", {
          description: "Please try again....",
        });
      },
      onSuccess: (data) => {
        // Show message
        toast.success("Your property has been Deleted!", {
          description: `View your property at ....`,
        });
      },
    }
  );

  async function submitHandler(values: z.infer<typeof PropertySchema>) {
    console.log("Hello!");

    if (!initProperty) {
      await triggerCreate({ property: values });
    } else {
      await triggerUpdate({
        property: values,
      });
    }
  }

  async function deleteHandler() {
    if (!initProperty || !user) return;

    await triggerDelete({
      payload: {
        propertyId: initProperty.results.property_id,
        userId: user.id,
        images: initProperty.results.images,
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
          <form onSubmit={form.handleSubmit(submitHandler)} className="h-100">
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 bg-white"
                  type="button"
                  onClick={() => router.back()}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {!initProperty ? "Create Property" : "Edit Property"}
                </h1>
                {initProperty && (
                  <div className="border h-8 px-2 py-2 flex justify-center items-center gap-3 rounded-md">
                    <Eye size={20} />
                    <p className="text-sm font-medium">
                      {form.getValues("visibility")}
                    </p>
                  </div>
                )}
              </div>
              <div className="hidden items-center gap-2 md:ml-auto md:flex ">
                {initProperty && (
                  // <Button
                  //   size="sm"
                  //   type="button"
                  //   variant="destructive"
                  //   onClick={async () => await deleteHandler()}
                  // >
                  //   Delete
                  // </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"destructive"}
                        size="sm"
                        className="gap-2"
                      >
                        <Trash2 size={16} className="text-black" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          Warning! This is can't be undone.
                        </DialogTitle>
                        <DialogDescription>
                          Deleting this image will be a permant action, and
                          can't be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter
                        style={{ justifyContent: "space-between" }}
                        className="flex p-0 m-0 justify-between items-center w-full"
                      >
                        <p className="text-sm font-normal ">
                          Are you sure you want to do this?
                        </p>
                        <Button
                          variant={"destructive"}
                          type="button"
                          onClick={async () => await deleteHandler()}
                        >
                          Confirm Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  type="submit"
                  className="gap-2"
                >
                  <Save size={16} />
                  {initProperty ? "Save" : "Create"}
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
                              <Input
                                className="w-full"
                                type="number"
                                {...field}
                              />
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
                              defaultValues={
                                initProperty?.results ? field.value : []
                              }
                              handleChange={(uploadedImages, deletedImages) => {
                                console.log("Images: ", uploadedImages);
                                if (initProperty) {
                                  if (deletedImages)
                                    setValue("deletedImages", deletedImages);
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
                            <FormLabel>Sale Type</FormLabel>
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
                              tags={field.value}
                              className="sm:min-w-[450px] w-full "
                              setTags={(newTags) => {
                                // setExtras(newTags);
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
      )}
    </>
  );
}
