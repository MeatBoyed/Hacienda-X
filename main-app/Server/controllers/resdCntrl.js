import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
//create property
export const createProperty = asyncHandler(async (req, res) => {
  const {
    agent_id,
    title,
    description,
    price,
    street, // Address fields
    city,
    country,
    bathrooms,
    rooms,
    pool,
    images, // Assuming images is an array of image files
    latitude,
    longitude,
  } = req.body;

  try {
    // Upload images to Supabase Storage
    const imageUrls = [];
    for (const image of images) {
      const { data, error } = await supabase.storage
        .from("property-images")
        .upload(`property-images/${image.name}`, image);

      if (error) {
        throw new Error("Failed to upload image");
      }
      imageUrls.push(data?.url);
    }

    // Create the address first
    const address = await prisma.address.create({
      data: {
        street,
        city,
        country,
        latitude,
        longitude,
      },
    });

    // Create the property and associate it with the address
    const property = await prisma.property.create({
      data: {
        agent: { connect: { user_id: agent_id } },
        title,
        description,
        price,
        address: { connect: { address_id: address.address_id } }, // Connect the property to the address
        bathrooms,
        rooms,
        pool,
        images: { set: imageUrls }, // Set the image URLs
        created_at: new Date(), // Use the current date/time for created_at
        updated_at: new Date(), // Use the current date/time for updated_at
        is_public: true, // Default value for is_public
        sold: false, // Default value for sold
      },
    });

    res.status(201).json({ message: "Property created successfully", property });
  } catch (err) {
    throw new Error(err.message);
  }
});
//get all properties
export const getAllProperties = asyncHandler(async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    res.status(200).json({ properties });
  } catch (err) {
    throw new Error(err.message);
  }
});

//function to get a specific document/residency
export const getPropertyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const property = await prisma.property.findUnique({
      where: { property_id: id },
    });
    if (!property) {
      res.status(404).json({ message: "Property not found" });
      return;
    }
    res.status(200).json({ property });
  } catch (err) {
    throw new Error(err.message);
  }
});

// Update a property by ID
export const updatePropertyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    agent_id,
    title,
    description,
    price,
    address,
    city,
    country,
    bathrooms,
    rooms,
    pool,
    images,
    latitude,
    longitude,
  } = req.body;

  try {
    const updatedProperty = await prisma.property.update({
      where: { property_id: id },
      data: {
        agent: { connect: { agent_id } },
        title,
        description,
        price,
        address,
        city,
        country,
        bathrooms,
        rooms,
        pool,
        images: { create: images }, // Assuming images is an array of objects
        latitude,
        longitude,
      },
    });
    res.status(200).json({ message: "Property updated successfully", property: updatedProperty });
  } catch (err) {
    throw new Error(err.message);
  }
});

// Delete a property by ID
export const deletePropertyById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.property.delete({
      where: { property_id: id },
    });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});