import mongoose, { Schema } from "mongoose";
import { Review, ReviewStatus, ReviewType } from "../utils/types";

const reviewSchema: Schema<Review> = new Schema(
  {
    reviewerId: { type: String, required: true },
    reviewerName: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, max: [5, "Rating should 1 to 5"], required: true },
    status: { type: String, enum: Object.values(ReviewStatus), required: true },
    restaurantId: { type: String, required: true },
    restaurantName: { type: String, required: true },
    ownerId: { type: String, required: true },
    ownerReply: [
      {
        _id: { type: String },
        reply: { type: String },
        createdAt: { type: Date },
      },
    ],
    reviewType: {
      type: String,
      enum: Object.values(ReviewType),
      required: true,
    },
    repliedTo: { type: String },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export { Review };
