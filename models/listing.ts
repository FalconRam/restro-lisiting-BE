import mongoose, { Schema } from "mongoose";
import { RestaurantsListing } from "../utils/types";
import { nanoid } from "nanoid";

const restaurantsListingSchema: Schema<RestaurantsListing> = new Schema(
  {
    restaurantName: { type: String, required: true },
    contactInfo: {
      emailId: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    address: {
      line_1: { type: String },
      street: { type: String },
      city: { type: String, required: true },
      pincode: {
        type: String,
        minlength: [6, "Pincode must be Min 6 Digits"],
        maxlength: [6, "Pincode must be Max 6 Digits"],
        required: true,
      },
      country: { type: String, required: true },
    },
    tableCapacity: {
      type: Number,
    },
    images: { type: [String], default: [] },
    foodMenu: [
      {
        _id: {
          type: String,
          default: () => nanoid(10),
        },
        itemName: { type: String },
        itemPrice: { type: String },
      },
    ],
    createdBy: {
      _id: {
        type: String,
        required: true,
      },
      onwerName: { type: String, required: true },
      ownerType: { type: String, required: true },
    },
    reviewsInfo: [
      {
        _id: {
          type: String,
          default: () => nanoid(10),
        },
        review: { type: String, required: true },
        reviewerId: { type: String, required: true },
        reviewReplies: [
          {
            _id: {
              type: String,
              default: () => nanoid(10),
            },
            reply: { type: String, required: true },
            replierId: { type: String, required: true },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RestaurantsListing = mongoose.model<RestaurantsListing>(
  "RestaurantsListing",
  restaurantsListingSchema
);

export { RestaurantsListing };
