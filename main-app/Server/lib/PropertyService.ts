import { DeletePropertyPayload, PropertySchema } from "@/lib/FormUtils";
import db from "../utils/db";
import S3Service from "@/components/UploadShad/server/S3Service";

class PropertyService {
  private s3Service: S3Service;
  constructor() {
    this.s3Service = new S3Service();
  }

  async Create(
    propertyPayload: PropertySchema,
    agentId: string
  ): Promise<{ success?: boolean; failure?: boolean; message?: string }> {
    return await db.property
      .create({
        data: {
          title: propertyPayload.title,
          description: propertyPayload.description,
          price: propertyPayload.price,
          visibility: propertyPayload.visibility,
          bathrooms: propertyPayload.bathrooms,
          bedrooms: propertyPayload.bedrooms,
          pool: propertyPayload.pool,
          squareMeter: propertyPayload.squareMeter,
          images: propertyPayload.images,
          saleType: propertyPayload.saleType,
          extraFeatures: propertyPayload.extraFeatures.map((extra) => extra.text),
          agent_id: agentId,
          sold: false,
          Address: {
            create: {
              address: propertyPayload.address,
              latitude: propertyPayload.lat,
              longitude: propertyPayload.lng,
            },
          },
        },
      })
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log("BusinessLayer: Unable to create property", error);
        return { failure: true, message: "Unable to create property" };
      });
  }

  async Update(
    propertyPayload: PropertySchema,
    agentId: string
  ): Promise<{ success?: boolean; failure?: boolean; message?: string }> {
    return await db.property
      .update({
        where: { property_id: propertyPayload.property_id },
        data: {
          title: propertyPayload.title,
          description: propertyPayload.description,
          price: propertyPayload.price,
          bathrooms: propertyPayload.bathrooms,
          bedrooms: propertyPayload.bedrooms,
          squareMeter: propertyPayload.squareMeter,
          pool: propertyPayload.pool,
          saleType: propertyPayload.saleType,
          visibility: propertyPayload.visibility,
          agent_id: agentId,
          images: propertyPayload.images,
          sold: false,
          extraFeatures: propertyPayload.extraFeatures.map((extra) => extra.text),
          Address: {
            update: {
              address: propertyPayload.address,
              latitude: propertyPayload.lat,
              longitude: propertyPayload.lng,
            },
          },
        },
        include: { Address: true },
      })
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log("BusinessLayer: Unable to update property", error);
        return { failure: true, message: "Unable to update property" };
      });
  }

  async Delete(payload: DeletePropertyPayload): Promise<{ success?: boolean; failure?: boolean; message?: string }> {
    // Delete property
    try {
      await db.property.update({
        where: {
          property_id: payload.propertyId,
          agent_id: payload.agentId,
        },
        data: { visibility: "Deleted" },
      });
    } catch (error) {
      console.log("PropertyService: Unable to delete property", error);
      return { failure: true, message: "Unable to delete property" };
    }

    // Delete Images
    return await this.s3Service
      .deleteFiles(payload.images)
      .then(() => {
        return { success: true };
      })
      .catch((error) => {
        console.log("PropertyService: Unable to delete images", error);
        return { success: true };
      });
  }
}

export default PropertyService;
