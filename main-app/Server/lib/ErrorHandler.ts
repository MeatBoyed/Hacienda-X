import { Prisma } from "@prisma/client";

export interface ServiceError {
  status: number;
  message: string;
}

export function handleError(error: any, serviceName: string, methodName: string): ServiceError {
  console.log(`${serviceName} | ${methodName} Error: `, error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error);
  }
  return { status: 500, message: "Unable to process request" };
}

export function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): ServiceError {
  switch (error.code) {
    case "P2000":
      return {
        status: 400,
        message: "The provided value for the column is too long for the column's type.",
      };
    case "P2001":
      return {
        status: 404,
        message: "The record searched for in the where condition does not exist.",
      };
    case "P2002":
      return { status: 409, message: "Unique constraint failed on the fields." };
    case "P2003":
      return { status: 400, message: "Foreign key constraint failed on the field." };
    case "P2004":
      return { status: 400, message: "A constraint failed on the database." };
    case "P2005":
      return {
        status: 400,
        message: "The value stored in the database for the field is invalid for the field's type.",
      };
    case "P2006":
      return { status: 400, message: "The provided value for the field is not valid." };
    case "P2007":
      return { status: 400, message: "Data validation error." };
    case "P2008":
      return { status: 500, message: "Failed to parse the query." };
    case "P2009":
      return { status: 500, message: "Failed to validate the query." };
    case "P2010":
      return {
        status: 500,
        message: "Raw query failed. Please check the query syntax and database schema.",
      };
    case "P2011":
      return { status: 400, message: "Null constraint violation on the fields." };
    case "P2012":
      return { status: 400, message: "Missing a required value." };
    case "P2013":
      return { status: 400, message: "Missing the required argument for the field." };
    case "P2014":
      return {
        status: 400,
        message:
          "The change you are trying to make would violate the required relation between the records.",
      };
    case "P2015":
      return { status: 404, message: "A related record could not be found." };
    case "P2016":
      return { status: 500, message: "Query interpretation error." };
    case "P2017":
      return { status: 500, message: "The records for the relation are not connected." };
    case "P2018":
      return { status: 500, message: "The required connected records were not found." };
    case "P2019":
      return { status: 500, message: "Input error. Please check the input data." };
    case "P2020":
      return { status: 500, message: "Value out of range for the type." };
    case "P2021":
      return { status: 500, message: "The table does not exist in the current database." };
    case "P2022":
      return { status: 500, message: "The column does not exist in the current database." };
    case "P2023":
      return { status: 500, message: "Inconsistent column data." };
    default:
      return { status: 500, message: "An unknown error occurred." };
  }
}
