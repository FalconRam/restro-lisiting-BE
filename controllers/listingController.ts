import { Request, Response } from "express";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/createResponse";
import { zodListingValidationService } from "../services/zodValidationService";
import { RestaurantsListing } from "../models/listing";
import { Admin, BusinessOwner } from "../models/user";
import { UserType } from "../utils/types";
import { findWhomUpdating } from "../services/listing/helperFunctions";

export const getAllRestaurantsController = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurantsList = await RestaurantsListing.find();
    return createSuccessResponse(
      res,
      200,
      { restaurantsList, restaurantCount: restaurantsList.length },
      "Restaurants retrieved successfully!..."
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const createRestaurantController = async (
  req: Request,
  res: Response
) => {
  try {
    const valResult = zodListingValidationService.createRestaurantBody(
      req.body
    );
    if (!valResult.success)
      return createErrorResponse(
        res,
        400,
        { error: valResult.error.issues },
        "Please Enter details in correct format!"
      );

    let newRestaurant;

    if (req.userType === UserType.bo) {
      let boDetails = await BusinessOwner.findOne({ emailId: req.emailId });
      if (!boDetails) return createErrorResponse(res, 401, {}, "Unauthorized");

      req.body.createdBy = {
        _id: boDetails._id,
        onwerName: boDetails.userName,
        ownerType: boDetails.userType,
      };

      newRestaurant = await RestaurantsListing.create(req.body);

      boDetails.ownedRestaurants.push(newRestaurant._id);
      await BusinessOwner.findByIdAndUpdate(boDetails._id, boDetails, {
        new: true,
      });
    } else if (req.userType === UserType.admin) {
      let adminDetails = await Admin.findOne({ emailId: req.emailId });
      if (!adminDetails)
        return createErrorResponse(res, 401, {}, "Unauthorized");

      req.body.createdBy = {
        _id: adminDetails._id,
        onwerName: adminDetails.userName,
        ownerType: adminDetails.userType,
      };

      newRestaurant = await RestaurantsListing.create(req.body);

      adminDetails.ownedRestaurants.push(newRestaurant._id);
      await Admin.findByIdAndUpdate(adminDetails._id, adminDetails, {
        new: true,
      });
    } else
      return createErrorResponse(
        res,
        401,
        {},
        "Kindly resigter yourself as Buisness Owner"
      );

    return createSuccessResponse(
      res,
      201,
      newRestaurant,
      "Restaurants created successfully!..."
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const deleteRestaurantController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.query.restaurantId) {
      return createErrorResponse(
        res,
        400,
        {},
        "Please provide a valid Restaurant details"
      );
    }

    const isAvailable = await RestaurantsListing.findOne({
      _id: req.query.restaurantId,
    });

    if (!isAvailable)
      createErrorResponse(
        res,
        404,
        {},
        "Please provide a valid Restaurant details"
      );

    await RestaurantsListing.findByIdAndDelete(req.query.restaurantId);

    return createSuccessResponse(res, 200, {}, "Deleted successfully!...");
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.message || error.stack || error);
  }
};

export const updateRestaurantController = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.query.restaurantId) {
      return createErrorResponse(
        res,
        400,
        {},
        "Please provide a valid Restaurant details"
      );
    }

    const restaurantDetails = await RestaurantsListing.findOne({
      _id: req.query.restaurantId,
    });

    if (!restaurantDetails)
      return createErrorResponse(
        res,
        404,
        {},
        "Please provide a valid Restaurant details"
      );

    /**
     * @Function findWhomUpdating
     *
     * @Description
     * Business Rules,
     * - Admin can edit any Restaurant
     * - Business Owners can udpdate their owned Restaurant only
     *
     */
    const { isAuthorizedToEdit, ownerDetails } = await findWhomUpdating(
      req,
      restaurantDetails
    );
    if (!isAuthorizedToEdit)
      return createErrorResponse(
        res,
        401,
        {},
        "You can't update other's Restaurants details"
      );
    let updatedRestaurant = await RestaurantsListing.findByIdAndUpdate(
      restaurantDetails._id,
      req.body,
      { new: true }
    );

    if (!updatedRestaurant) throw new Error("Error on updating restaurant");

    return createSuccessResponse(
      res,
      200,
      updatedRestaurant,
      "Deleted successfully!..."
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.message || error.stack || error);
  }
};
