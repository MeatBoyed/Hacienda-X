import db from "@/Utils/db";
import { UserPayload } from "../controllers/userController";
import { Err, Ok, Result } from "ts-results";
import { handleError, ServiceError } from "../utils/ErrorHandler";
import { User } from "@prisma/client";

export interface UserServiceResponse {
  status: number;
  User: User | null;
}

export async function Create(
  userPayload: UserPayload
): Promise<Result<UserServiceResponse, ServiceError>> {
  try {
    // Create User
    const user = await db.user.create({
      data: {
        email: userPayload.email,
        company: userPayload.company,
        public_id: userPayload.user_id,
        lastName: userPayload.lastName,
        firstName: userPayload.firstName,
        role: "agent",
      },
    });
    return Ok({ status: 200, User: user });
  } catch (err) {
    const error = handleError(err, "UserService", "Create");
    if (error.status === 409) {
      return Ok({ status: 409, User: null });
    }
    return Err(error);
  }
}

export async function GetUser(userId: string): Promise<Result<UserServiceResponse, ServiceError>> {
  try {
    //   Assumes that presence in the database means that the user is an agent
    const user = await db.user.findFirst({
      where: { public_id: userId },
    });

    return Ok({ status: 200, User: user });
  } catch (error) {
    return Err(handleError(error, "UserService", "GetUser"));
  }
}
