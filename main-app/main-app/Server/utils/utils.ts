import { Prisma } from "@prisma/client";

export type PropertyWithAddress = Prisma.PropertyGetPayload<{
  include: { Address: true };
}>;

export type PropertyWithAddressAndAgent = Prisma.PropertyGetPayload<{
  include: { Address: true; agent: true };
}>;
