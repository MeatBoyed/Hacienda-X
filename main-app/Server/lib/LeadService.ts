import { DeletePropertyPayload, PropertySchema } from "@/lib/FormUtils";
import db from "../utils/db";
import { Result, Ok, Err } from "ts-results";
import S3Service from "@/components/UploadShad/server/S3Service";
import { Lead, Prisma } from "@prisma/client";
import { z } from "zod";

export interface LeadServiceResponse {
  leads: Lead[];
  total: number;
}

interface LeadServiceError {
  status: number;
  message: string;
}

export const LeadPayloadSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long." }),
  surname: z.string().min(3, { message: "Surname must be at least 3 characters long." }),
  email: z.string().email({ message: "Email address must be valid." }),
  message: z.string().min(10, {
    message: "Please enter a short message, longer than 10 characters.",
  }),
  phoneNumber: z.string(),
  propertyId: z.string().min(3, { message: "Property Id is required" }),
  agentId: z.string().min(3, { message: "Agent Id is required" }),
});
export type LeadPayload = z.infer<typeof LeadPayloadSchema> & {};

class LeadService {
  private s3Service: S3Service;
  constructor() {
    this.s3Service = new S3Service();
  }

  async GetAll(agentId?: string): Promise<Result<LeadServiceResponse, LeadServiceError>> {
    throw new Error("Not Implemented");
  }

  async Get(propertyId?: string, slug?: string, agent?: boolean): Promise<Result<LeadServiceResponse, LeadServiceError>> {
    throw new Error("Not Implemented");
  }

  async Search(where: Prisma.PropertyWhereInput): Promise<Result<LeadServiceResponse, LeadServiceError>> {
    throw new Error("Not Implemented");
  }

  async Create(leadPayload: LeadPayload): Promise<Result<LeadServiceResponse, LeadServiceError>> {
    return await db.lead
      .create({
        data: {
          name: leadPayload.name,
          email: leadPayload.email,
          surname: leadPayload.surname,
          message: leadPayload.message,
          property_id: leadPayload.propertyId,
          phoneNumber: leadPayload.phoneNumber,
          agent: {
            connect: { public_id: leadPayload.agentId },
          },
          customer_id: leadPayload.agentId,
        },
      })
      .then((data) => {
        return Ok({
          leads: [data],
          total: 1,
        });
      })
      .catch((error) => {
        return Err(this.handleError(error, "Create"));
      });
  }

  async Update(propertyPayload: PropertySchema, agentId: string): Promise<Result<LeadServiceResponse, LeadServiceError>> {
    throw new Error("Not Implemented");
  }

  async Delete(payload: DeletePropertyPayload): Promise<Result<LeadServiceResponse, LeadServiceError>> {
    throw new Error("Not Implemented");
  }

  handleError(error: any, methodName: string): LeadServiceError {
    console.log(`Lead Service | ${methodName}  Error: `, error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { status: parseInt(error.code), message: error.message };
    }
    return { status: 500, message: "Unable to delete property" };
  }
}

export default LeadService;
