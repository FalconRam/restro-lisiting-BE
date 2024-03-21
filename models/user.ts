import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  name: string;
  emailId: string;
  password: string;
  userType: UserType;
  createdAt: Date;
}

enum UserType {
  admin = "admin",
  bo = "bo",
  public = "public",
}

const userSchema: Schema<User> = new Schema(
  {
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: Object.values(UserType), required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<User>("User", userSchema);

export default User;
