import { Property } from "@prisma/client";
import db from "../db";

export async function getAllProperties() {
  return await db.property.findFirst();
}

// export async function createProperty() {
//   return await db.property.create({
//     data: {
//       title: "Modern Apartment in Downtown",
//       description:
//         "A stylish and modern 2-bedroom apartment located in the heart of the city.",
//       price: 200000,
//       address: "123 Main St",
//       city: "New York",
//       country: "USA",
//       image: "https://example.com/apartment1.jpg",
//       facilities: ["parking", "gym", "pool"],
//       userEmail: "user1@example.com",
//     },
//   });
// }
export const createProperty = async () => {
  try {
    // const response = await db.property.findMany();
    const response = await db.property.create({
      data: {
        title: "Modern Apartment in Downtown",
        description:
          "A stylish and modern 2-bedroom apartment located in the heart of the city.",
        price: 200000,
        address: "123 Main St",
        city: "New York",
        country: "USA",
        image: "https://example.com/apartment1.jpg",
        facilities: ["parking", "gym", "pool"],
      },
    });

    // IMPLEMENT
    //   if (response.status === 400 || response.status === 500) {
    //     throw response;
    //   }
    return response;
  } catch (error) {
    //   toast.error("Something went wrong");
    throw error;
  }
};
