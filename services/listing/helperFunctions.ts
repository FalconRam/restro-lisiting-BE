import { Request } from "express";
import { RestaurantsListing, UserType } from "../../utils/types";
import { Admin, BusinessOwner } from "../../models/user";

export const findWhomUpdating = async (
  req: Request,
  restaurantDetails: RestaurantsListing
) => {
  try {
    let ownerDetails;
    switch (req.userType) {
      case UserType.admin: {
        ownerDetails = await Admin.findOne({ _id: req._id }).select(
          "-password"
        );
        break;
      }
      case UserType.bo: {
        ownerDetails = await BusinessOwner.findOne({ _id: req._id }).select(
          "-password"
        );
        break;
      }
      default:
        throw new Error(`Unknown user type ${req.userType}`);
    }
    if (!ownerDetails) throw new Error("Unknown user");

    let isAuthorizedToEdit =
      restaurantDetails.createdBy._id === ownerDetails._id;
    isAuthorizedToEdit = req.userType === UserType.admin;

    return { isAuthorizedToEdit, ownerDetails };
  } catch (error: any) {
    throw new Error(error.message || error.stack || error);
  }
};
