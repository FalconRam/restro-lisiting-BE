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
  phoneNumber: string;
  tableCapacity: number;
  address: {
    line_1: string;
    street: string;
    city: string;
    pincode: number;
    counrty: string;
  };
  image: string;
}

export enum UserType {
  admin = "admin",
  bo = "bo", // Business Owner
  user = "user", // Normal User
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
