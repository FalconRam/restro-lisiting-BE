import { Document } from "mongoose";
import jwt from "jsonwebtoken";

/* DB Model Types/Interface/Enums */

export interface User extends Document {
  userName: string;
  emailId: string;
  password: string;
  userType: UserType;
  accessToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessOwner extends User {
  ownedRestaurants: string[];
}

export interface Admin extends User {
  ownedRestaurants: string[];
}

export interface RestaurantsListing extends Document {
  restaurantName: string;
  contactInfo: {
    emailId: string;
    phoneNumber: string;
  };
  tableCapacity: number;
  address: {
    line_1: string;
    street: string;
    city: string;
    pincode: string;
    counrty: string;
  };
  images: string[];
  foodMenu: {
    _id: string;
    itemName: string;
    itemPrice: string;
  }[];
  createdBy: {
    _id: string;
    onwerName: string;
    ownerType: string;
  };
  reviewsInfo: {
    _id: string;
    review: string;
    rating: number;
    reviewerId: string;
    reviewerName: string;
    ownerReply: {
      _id: string;
      reply: string;
      createdAt: string;
    }[];
  }[];
}

export interface Review extends Document {
  reviewerId: string;
  reviewerName: string;
  reviewId: string;
  review: string;
  rating: number;
  restaurantId: string;
  restaurantName: string;
  ownerId: string;
  ownerReply: {
    _id: string;
    reply: string;
    createdAt: string;
  }[];
  repliedTo: string;
  reviewType: ReviewType;
  status: ReviewStatus;
}

export enum UserType {
  admin = "admin",
  bo = "bo", // Business Owner
  user = "user", // Normal User
}

export enum ReviewType {
  review = "review", // Review to Restaurant
  reply = "reply", // Reply to Review
}

export enum ReviewStatus {
  replied = "REPLIED",
  notReplied = "NOTREPLIED",
}

/* Other Types/Interface/Enums */

declare module "express-serve-static-core" {
  interface Request {
    _id: string;
    emailId: string;
    userType: string;
  }
}

export interface customJWTPayload extends jwt.JwtPayload {
  _id: string;
  emailId: string;
  userType: string;
}

export type UserRequestBody = {
  userName: string;
  emailId: string;
  password: string;
  userType: string;
};
