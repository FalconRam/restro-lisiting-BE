import { Request } from "express";
import { RestaurantsListing, UserType } from "../../utils/types";
import { Admin, User } from "../../models/user";

export const findWhoIs = async (
  req: Request,
  isToCheckAuthorized: boolean,
  restaurantDetails?: RestaurantsListing
) => {
  try {
    let userDetails;
    switch (req.userType) {
      case UserType.admin: {
        userDetails = await Admin.findById(req._id).select("-password");
        break;
      }
      case UserType.user: {
        userDetails = await User.findById(req._id).select("-password");
        break;
      }
      default:
        throw new Error(`Unknown user type ${req.userType}`);
    }
    if (!userDetails) throw new Error("Unknown user");

    if (isToCheckAuthorized && restaurantDetails) {
      let isAuthorizedToDelete = false;
      restaurantDetails.reviewsInfo.map((review) => {
        if (review.reviewerId === userDetails._id.toString())
          isAuthorizedToDelete = true;
      });

      if (!isAuthorizedToDelete)
        isAuthorizedToDelete = req.userType === UserType.admin;

      return { isAuthorizedToDelete, userDetails };
    }
    return { userDetails };
  } catch (error: any) {
    throw new Error(error.message || error.stack || error);
  }
};
