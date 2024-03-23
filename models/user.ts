import mongoose, { Schema } from "mongoose";
import { Admin, BusinessOwner, User, UserType } from "../utils/types";

const userSchema: Schema<User> = new Schema(
  {
    userName: { type: String, required: true, unique: true },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: Object.values(UserType), required: true },
  },
  { timestamps: true }
);

const businessOwnerSchema: Schema<BusinessOwner> = new Schema({
  ownedRestaurants: { type: [String], default: [] },
});

const AdminSchema: Schema<Admin> = new Schema({
  ownedRestaurants: { type: [String], default: [] },
});

const User = mongoose.model<User>("User", userSchema);
const Admin = User.discriminator<Admin>("Admin", AdminSchema);
const BusinessOwner = User.discriminator<BusinessOwner>(
  "BusinessOwner",
  businessOwnerSchema
);

export { User, BusinessOwner, Admin };
