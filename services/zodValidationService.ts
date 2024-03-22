import { z as zod } from "zod";
import { UserRequestBody, UserType } from "../utils/types";

export const zodAuthValidationService = {
  createUserBody: (payload: UserRequestBody) => {
    const body = zod.object({
      userName: zod.string(),
      emailId: zod.string().email(),
      password: zod.string(),
      userType: zod.nativeEnum(UserType),
    });
    return body.safeParse(payload);
  },
  loginUserBody: (payload: UserRequestBody) => {
    const body = zod.object({
      emailId: zod.string().email(),
      password: zod.string(),
    });
    return body.safeParse(payload);
  },
};
