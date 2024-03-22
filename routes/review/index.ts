import express, { Request, Response } from "express";
import {
  adminUserMiddleware,
  authMiddlware,
  businessOwnerMiddlware,
} from "../../middleware";
import {
  createReviewController,
  deleteReviewController,
  getMyReviewsController,
  getPendingReviewController,
  replyToReviewController,
} from "../../controllers/reviewController";
import { createErrorResponse } from "../../services/createResponse";

const router = express.Router();

router.use(authMiddlware);

// Accessed by UserType - user, admin, bo

router.patch("/");
router.get("/get-MyReviews", getMyReviewsController);

// Accessed Only by UserType - bo
router.get(
  "/bo/getPendingReviews",
  businessOwnerMiddlware,
  getPendingReviewController
);
router.post("/bo/reply", businessOwnerMiddlware, replyToReviewController);

// Accessed Only by UserType - user, admin
router.use(adminUserMiddleware);

router.post("/create-review", createReviewController);
router.delete("/", deleteReviewController);

export default router;
