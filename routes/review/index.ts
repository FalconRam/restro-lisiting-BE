import express from "express";
import {
  adminBoMiddleware,
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
  updateReplyController,
  updateReviewController,
} from "../../controllers/reviewController";

const router = express.Router();

router.use(authMiddlware);

/* 
<<<< TODO >>>>
Complete swagger for,
1. PATCH - /reply-update
2. PATCH - / - Review update
*/

// Accessed Only by UserType - user, admin

/**
 * @openapi
 * /api/v1/review/create-review:
 *   post:
 *     tags:
 *       - Review
 *     summary: Create a review (Access - Admin, User)
 *     description: Admin & User can create a review on a restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewRequest'
 *     responses:
 *       200:
 *         description: Review created successfully
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateReviewResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/create-review", adminUserMiddleware, createReviewController);

/**
 * @openapi
 * /api/v1/review:
 *   delete:
 *     tags:
 *       - Review
 *     summary: Delete a review (Access - Admin, User)
 *     description:
 *      Delete a review by its reviewId and restaurantId.
 *      Admin can delete any review, but User can only delete their own review.
 *     parameters:
 *       - in: query
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewDeletedResponse'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized to Delete
 *       404:
 *         description: No Review Found to Delete or Given Restaurant Details not correct
 *       500:
 *         description: Internal Server Error
 */
router.delete("/", adminUserMiddleware, deleteReviewController);

/**
 * @openapi
 * /api/v1/review:
 *   patch:
 *     tags:
 *       - Review
 *     summary: Update Reply (Access - Admin & User)
 *     description:  Admin & User can update to their Review if they created it.
 *     parameters:
 *       - in: query
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReviewRequest'
 *     responses:
 *       '200':
 *         description: Successful response with updated review details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateReviewResponse'
 *       '400':
 *         description: Bad request, missing or invalid parameters.
 *       '401':
 *         description: Unauthorized access, user not authorized to update review.
 *       '404':
 *         description: Review or restaurant not found.
 *       '500':
 *         description: Internal server error.
 *
 */
router.patch("/", adminUserMiddleware, updateReviewController);

// Accessed by UserType - admin, bo

/**
 * @openapi
 * /api/v1/review/reply:
 *   post:
 *     tags:
 *       - Review
 *     summary: Reply to a review (Access - Buisness Owner & Admin)
 *     description: Buisness Owner & Admin can Reply to a review only if they are owner of Restaurant
 *     parameters:
 *       - in: query
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessOwnerReplyRequestBody'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessOwnerReplyResponse'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/reply", adminBoMiddleware, replyToReviewController);

/**
 * @openapi
 * /api/v1/review/reply-update:
 *   patch:
 *     tags:
 *       - Review
 *     summary: Update Reply (Access - Buisness Owner & Admin)
 *     description: Buisness Owner & Admin can update to their Reply to a review only if they are owner of Restaurant
 *     parameters:
 *       - in: query
 *         name: replyId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReplyUpdateRequest'
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReplyUpdateResponse'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
router.patch("/reply-update", adminBoMiddleware, updateReplyController);

// Accessed by logged-in user session
/**
 * @openapi
 * /api/v1/review/getMyReviews:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get reviews submitted (Access - Logged in User)
 *     description: Get reviews submitted by UserId from JWT Token
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MyReviewResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get("/getMyReviews", getMyReviewsController);

// Accessed Only by UserType - bo
/**
 * @openapi
 * /api/v1/review/bo/getPendingReviews:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get pending reviews (Access - Business Owner)
 *     description:
 *      Get pending reviews for a business owner to reply. Accessed only by Logged in Business Owner.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessOwnerPendingReviewResponse'
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/bo/getPendingReviews",
  businessOwnerMiddlware,
  getPendingReviewController
);

export default router;
