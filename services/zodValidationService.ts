import { z as zod } from "zod";
import {
  RestaurantsListing,
  Review,
  ReviewType,
  UserRequestBody,
  UserType,
} from "../utils/types";

export const zodAuthValidationService = {
  createUserBody: (payload: UserRequestBody) => {
    const body = zod.object({
      userName: zod.string().min(3),
      emailId: zod.string().email(),
      password: zod.string().min(6),
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
      restaurantName: zod.string().min(3),
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
            itemName: zod.string().min(1),
            itemPrice: zod.string(),
          })
        )
        .optional(),
    });
    return body.safeParse(payload);
  },
};

export const zodReviewValidationService = {
  createReviewBody: (payload: Review) => {
    const body = zod.object({
      review: zod.string().min(3),
      rating: zod.number().lte(5),
      restaurantId: zod.string(),
      ownerId: zod.string(),
      reviewType: zod.nativeEnum(ReviewType),
      repliedTo: zod.string().optional(),
    });
    return body.safeParse(payload);
  },
  createReplyToReviewBody: (payload: {
    reply: string;
    reviewId: string;
    restaurantId: string;
  }) => {
    const body = zod.object({
      reply: zod.string().min(3),
      reviewId: zod.string(),
      restaurantId: zod.string(),
    });
    return body.safeParse(payload);
  },
  fetchIdQuery: (payload: string) => {
    const query = zod.string();
    return query.safeParse(payload);
  },
};
