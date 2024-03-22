import { z as zod } from "zod";
import { RestaurantsListing, UserRequestBody, UserType } from "../utils/types";

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

export const zodListingValidationService = {
  createRestaurantBody: (payload: RestaurantsListing) => {
    const body = zod.object({
      restaurantName: zod.string(),
      contactInfo: zod.object({
        emailId: zod.string().email(),
        phoneNumber: zod.string(),
      }),
      tableCapacity: zod.number(),
      address: zod.object({
        line_1: zod.string(),
        street: zod.string(),
        city: zod.string(),
        pincode: zod.string().length(6),
        country: zod.string(),
      }),
      images: zod.array(zod.string()).optional(),
      foodMenu: zod
        .array(
          zod.object({
            itemName: zod.string(),
            itemPrice: zod.string(),
          })
        )
        .optional(),
    });
    return body.safeParse(payload);
  },
};
