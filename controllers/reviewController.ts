import { Request, Response } from "express";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/createResponse";
import { Review } from "../models/reveiw";
import { ReviewStatus, UserType } from "../utils/types";
import { zodReviewValidationService } from "../services/zodValidationService";
import { RestaurantsListing } from "../models/listing";
import { findWhoIs } from "../services/review/helperFunctions";
import { nanoid } from "nanoid";

export const createReviewController = async (req: Request, res: Response) => {
  try {
    const valResult = zodReviewValidationService.createReviewBody(req.body);

    if (!valResult.success)
      return createErrorResponse(
        res,
        400,
        { error: valResult.error.issues },
        "Please Enter details in correct format!"
      );
    let restaurantDetails = await RestaurantsListing.findOne({
      _id: req.body.restaurantId,
    });

    if (
      !restaurantDetails ||
      restaurantDetails.createdBy._id !== req.body.ownerId
    )
      return createErrorResponse(
        res,
        404,
        {},
        "Given Restaurant Details not correct!"
      );

    /**
     * @Function findWhoIs
     *
     * @Description
     * Business Rules,
     * - Admin & User can create a Review for any Restaurant
     * - Here only collects only User details, the 2nd argument passed as false(isToCheckAuthorized),
     *   so only retrieve user details.
     * - This function can also returns isAuthorizedToDo boolean, based on Requirement
     */
    const { userDetails } = await findWhoIs(req, false);

    // Adding more Required Details as per Review Schema
    req.body.reviewerId = req._id;
    req.body.reviewerName = userDetails.userName;
    req.body.restaurantName = restaurantDetails.restaurantName;
    req.body.status = ReviewStatus.notReplied; // Initial state is NOTREPLIED

    // Create new Review Record
    const newReview = await Review.create(req.body);

    let reviewBody = {
      _id: newReview._id,
      review: newReview.review,
      rating: newReview.rating,
      reviewerId: newReview.reviewerId,
      reviewerName: newReview.reviewerName,
      ownerReply: [],
    };
    restaurantDetails.reviewsInfo.push(reviewBody);

    await RestaurantsListing.findByIdAndUpdate(
      { _id: newReview.restaurantId },
      restaurantDetails,
      { new: true }
    );

    return createSuccessResponse(res, 201, {}, "Thank You for the Review!");
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const replyToReviewController = async (req: Request, res: Response) => {
  try {
    const valResult = zodReviewValidationService.createReplyToReviewBody({
      ...req.body,
      ...req.query,
    });
    if (!valResult.success)
      return createErrorResponse(
        res,
        400,
        { error: valResult.error.issues },
        "Please Enter details in correct format!"
      );
    const reviewDetails = await Review.findById({ _id: req.query.reviewId });

    if (!reviewDetails)
      return createErrorResponse(res, 404, {}, "No Review found");

    if (reviewDetails.status === ReviewStatus.replied)
      return createErrorResponse(res, 404, {}, "No Pending Task available");

    let restaurantDetails = await RestaurantsListing.findOne({
      _id: req.query.restaurantId,
    });

    if (!restaurantDetails || restaurantDetails.createdBy._id !== req._id)
      return createErrorResponse(
        res,
        404,
        {},
        "Given Restaurant Details not correct!"
      );

    const reviewBody = {
      _id: nanoid(10),
      reply: req.body.reply,
      createdAt: new Date().toISOString(),
    };

    // Add Response to the Review
    restaurantDetails.reviewsInfo.map((review) => {
      if (review._id === req.query.reviewId) {
        review.ownerReply.push(reviewBody);
      }
    });

    let updatedRestaurantDetails = await RestaurantsListing.findByIdAndUpdate(
      { _id: req.query.restaurantId },
      restaurantDetails,
      { new: true }
    );

    if (!updatedRestaurantDetails)
      return createErrorResponse(
        res,
        404,
        {},
        "Given Restaurant Details not correct!"
      );

    reviewDetails.ownerReply.push(reviewBody);
    reviewDetails.status = ReviewStatus.replied; // Mark Status as REPLIED

    const updatedReviewDetails = await Review.findByIdAndUpdate(
      { _id: reviewDetails._id },
      reviewDetails,
      {
        new: true,
      }
    );

    return createSuccessResponse(
      res,
      200,
      { restaurantDetails, updatedReviewDetails },
      "Replied successfully to User Review"
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const updateReviewController = async (req: Request, res: Response) => {
  try {
    let restaurantDetails = await RestaurantsListing.findById(
      req.query.restaurantId
    ).select("-updatedAt -__v");

    if (!restaurantDetails)
      return createErrorResponse(res, 404, {}, "No Restaurant Found");

    /**
     * @Function findWhoIs
     *
     * @Description
     * Business Rules,
     * - Admin & User can create a Review for any Restaurant
     * - Here only collects only User details, the 2nd argument passed as true(isToCheckAuthorized),
     * - This function can also returns isAuthorizedToDo boolean,
     *    based on user session whether, they can update
     */
    const { isAuthorizedToDo } = await findWhoIs(req, true, restaurantDetails);

    if (!isAuthorizedToDo)
      return createErrorResponse(res, 401, {}, "Unauthorized to Update");

    // Add New Review to the Restaurant
    restaurantDetails.reviewsInfo.forEach((review) => {
      if (review._id === req.query.reviewId) {
        review.review = req.body.review;
        review.rating = req.body.rating;
      }
    });

    restaurantDetails = await RestaurantsListing.findByIdAndUpdate(
      req.query.restaurantId,
      restaurantDetails,
      { new: true }
    );

    return createSuccessResponse(
      res,
      200,
      {},
      "Your Review updated successfully!..."
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const updateReplyController = async (req: Request, res: Response) => {
  try {
    const restaurantDetails = await RestaurantsListing.findById(
      req.query.restaurantId
    ).select("-updatedAt -__v");

    if (!restaurantDetails)
      return createErrorResponse(res, 404, {}, "No Restaurant Found");

    if (req._id !== restaurantDetails.createdBy._id)
      return createErrorResponse(res, 401, {}, "Unauthorized to Update");

    restaurantDetails.reviewsInfo.forEach((review) => {
      if (
        review._id === req.query.reviewId &&
        review.ownerReply[0]._id === req.query.replyId
      )
        review.ownerReply[0].reply = req.body.reply;
    });

    const updatedRestaurantDetails = await RestaurantsListing.findByIdAndUpdate(
      req.query.restaurantId,
      restaurantDetails,
      { new: true }
    );

    if (!updatedRestaurantDetails)
      throw new Error("Error while updating reply");

    return createSuccessResponse(
      res,
      200,
      updatedRestaurantDetails,
      "Your reviews retrieved successfully!..."
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const deleteReviewController = async (req: Request, res: Response) => {
  try {
    if (!req.query.reviewId || !req.query.restaurantId)
      return createErrorResponse(
        res,
        404,
        {},
        "Please Enter details in correct format!"
      );

    const restaurantDetails = await RestaurantsListing.findById(
      req.query.restaurantId
    );
    if (!restaurantDetails)
      return createErrorResponse(
        res,
        404,
        {},
        "Given Restaurant Details not correct!"
      );

    /**
     * @Function findWhoIs
     *
     * @Description
     * Business Rules,
     * - Admin & User can create a Review for any Restaurant
     * - Here only collects only User details, the 2nd argument passed as true(isToCheckAuthorized),
     * - This function can also returns isAuthorizedToDo boolean,
     *    based on user session whether, they can update
     */
    let { isAuthorizedToDo } = await findWhoIs(req, true, restaurantDetails);

    // isAuthorizedToDo set as true, if the User session is admin,
    // since they can delete any review
    if (req.userType === UserType.admin) isAuthorizedToDo === true;

    if (!isAuthorizedToDo)
      return createErrorResponse(res, 401, {}, "Unauthorized to Delete");

    const countBeforDel = restaurantDetails.reviewsInfo.length;

    restaurantDetails.reviewsInfo = restaurantDetails.reviewsInfo.filter(
      (review) => review._id !== req.query.reviewId
    );

    if (countBeforDel === restaurantDetails.reviewsInfo.length)
      return createErrorResponse(res, 404, {}, "No Review Found to Delete");

    const updatedRestaurantDetails = await RestaurantsListing.findByIdAndUpdate(
      req.query.restaurantId,
      restaurantDetails,
      { new: true }
    );
    if (!updatedRestaurantDetails) throw new Error();

    // Deletes the Review record from Review doc in DB
    await Review.findByIdAndDelete(req.query.reviewId);

    return createSuccessResponse(
      res,
      200,
      updatedRestaurantDetails,
      "Review deleted Successfully!..."
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const getPendingReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    // Get Not Responded Reviews list based on User bo session
    const pendingReview = await Review.find({
      $and: [{ ownerId: req._id }, { status: ReviewStatus.notReplied }],
    }).select("-__v");
    return createSuccessResponse(res, 200, { pendingReview }, "");
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

export const getMyReviewsController = async (req: Request, res: Response) => {
  try {
    // Get Reviews list based on User bo session
    const myReviews = await Review.find({ reviewerId: req._id }).select(
      "-updatedAt -__v"
    );
    return createSuccessResponse(
      res,
      200,
      { myReviews },
      "Your reviews retrieved successfully!..."
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};
