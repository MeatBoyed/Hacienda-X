import { DeletePropertyPayload, PropertySchema } from "@/lib/FormUtils";
import db from "../utils/db";
import { Result, Ok, Err } from "ts-results";
import S3Service from "@/components/UploadShad/server/S3Service";
import { Prisma } from "@prisma/client";
import { PropertyWithAddress, PropertyWithAddressAndAgent } from "../utils/utils";

export interface PropertyServiceResponse {
  properties: PropertyWithAddress[] | PropertyWithAddressAndAgent[];
  total: number;
}

interface PropertyServiceError {
  status: number;
  message: string;
}

class PropertyService {
  private s3Service: S3Service;
  constructor() {
    this.s3Service = new S3Service();
  }

  async GetAll(agentId?: string): Promise<Result<PropertyServiceResponse, PropertyServiceError>> {
    return await db.property
      .findMany({
        where: { agent_id: agentId, visibility: { not: "Deleted" } },
        include: { Address: true },
      })
      .then((data) => {
        return Ok({ properties: data, total: data.length });
      })
      .catch((error) => {
        return Err(this.handleError(error, "GetAll"));
      });
  }

  async Get(propertyId?: string, slug?: string, agent?: boolean): Promise<Result<PropertyServiceResponse, PropertyServiceError>> {
    return await db.property
      .findFirstOrThrow({
        where: {
          title: slug,
          property_id: propertyId,
          visibility: { not: "Deleted" },
        }, // Property needs a Slug field in DB
        include: { Address: true, agent: agent },
      })
      .then((data) => {
        return Ok({ properties: [data], total: 1 });
      })
      .catch((error) => {
        return Err(this.handleError(error, "Get"));
      });
  }

  async Search(where: Prisma.PropertyWhereInput): Promise<Result<PropertyServiceResponse, PropertyServiceError>> {
      return await db.property.findMany({
        where: where,
      include: { Address: true },
    }).then((data) => {
      return Ok({ properties: data, total: data.length });
    }).catch((error) => {
        return Err(this.handleError(error, "Search"));
      });
  }
  async Create(propertyPayload: PropertySchema, agentId: string): Promise<Result<PropertyServiceResponse, PropertyServiceError>> {
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
      .then((data) => {
        return Ok({ properties: [], total: 1 });
      })
      .catch((error) => {
        return Err(this.handleError(error, "Create"));
      });
  }

  async Update(propertyPayload: PropertySchema, agentId: string): Promise<Result<PropertyServiceResponse, PropertyServiceError>> {
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
      .then((data) => {
        return Ok({ properties: [data], total: 1 });
      })
      .catch((error) => {
        return Err(this.handleError(error, "Update"));
      });
  }

  async Delete(payload: DeletePropertyPayload): Promise<Result<PropertyServiceResponse, PropertyServiceError>> {
    try {
      await db.property.update({
        where: {
          property_id: payload.propertyId,
          agent_id: payload.agentId,
        },
        data: { visibility: "Deleted" },
      });
    } catch (error) {
      return Err(this.handleError(error, "Delete"));
    }

    // Delete Images
    return await this.s3Service
      .deleteFiles(payload.images)
      .then(() => {
        return Ok({ properties: [], total: 0 });
      })
      .catch((error) => {
        return Err(this.handleError(error, "Delete"));
      });
  }

  handleError(error: any, methodName: string): PropertyServiceError {
    console.log(`Property Service | ${methodName}  Error: `, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { status: parseInt(error.code), message: error.message };
    }
    return { status: 500, message: "Unable to delete property" };
  }
}

export default PropertyService;
