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
        // throw error on other role apart from admin & user
        throw new Error(`Unknown user type ${req.userType}`);
    }

    if (!userDetails) throw new Error("Unknown user");

    if (isToCheckAuthorized && restaurantDetails) {
      let isAuthorizedToDo = false;
      restaurantDetails.reviewsInfo.map((review) => {
        // set true only if reviewerId & session user Id and reviewId & reviewId sent on query matched
        if (
          review.reviewerId === userDetails._id.toString() &&
          review._id === req.query.reviewId
        )
          isAuthorizedToDo = true;
      });

      // set authorization as true if the user is admin, since User can do any action
      if (!isAuthorizedToDo) isAuthorizedToDo = req.userType === UserType.admin;

      return { isAuthorizedToDo, userDetails };
    }
    return { userDetails };
  } catch (error: any) {
    throw new Error(error.message || error.stack || error);
  }
};
