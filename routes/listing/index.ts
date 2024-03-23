import express from "express";
import {
  createRestaurantController,
  getAllRestaurantsController,
  deleteRestaurantController,
  updateRestaurantController,
} from "../../controllers/listingController";
import {
  adminBoMiddleware,
  adminMiddlware,
  authMiddlware,
} from "../../middleware";

const router = express.Router();

router.use(authMiddlware); // All the Routes Uses general auth middleware

/**
 * @openapi
 * '/api/v1/listing':
 *   get:
 *     tags:
 *       - Restaurant Listing
 *     summary: Get all restaurants (All Logged in Users)
 *     description: Accessed by all types of Roles who are logged in
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     restaurantsList:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/GetAllRestaurantsResponse'
 *                     restaurantCount:
 *                       type: integer
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllRestaurantsController);

// Only Accessed by UserType - admin

/**
 * @openapi
 * '/api/v1/listing':
 *   delete:
 *     tags:
 *       - Restaurant Listing
 *     summary: Delete a restaurant (Admin only)
 *     description:
 *       Delete a restaurant with the restaurantId passed in query param.
 *       This route only can accessed by Admin.
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the restaurant to be deleted
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted successfully!...
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/", adminMiddlware, deleteRestaurantController);

// Below are accessed only by UserType - admin, bo
router.use(adminBoMiddleware);

/**
 * @openapi
 * '/api/v1/listing':
 *   patch:
 *     tags:
 *       - Restaurant Listing
 *     summary: Update a restaurant (Admin or Business Owner only)
 *     description:
 *       Update details of a restaurant. This endpoint is accessible only by users with roles 'admin' or 'bo'.
 *       Whereas the Restaurant owned Users from roles bo, admin only can update.
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         default: "65fe92a8713299cbaba4ed5f"
 *         description: The ID of the restaurant to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRestaurantInput'
 *     responses:
 *       '200':
 *         description: Restaurant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateRestaurantResponse'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized - User not allowed to update restaurant
 *       '404':
 *         description: Restaurant not found
 *       '500':
 *         description: Internal Server Error
 */
router.patch("/", updateRestaurantController);

/**
 * @openapi
 * '/api/v1/listing/create-restaurant':
 *  post:
 *     tags:
 *     - Restaurant Listing
 *     summary: Create a new restaurant (Admin or Business Owner only)
 *     description:
 *       This endpoint allows creating a new restaurant.
 *       Only users with the role of admin or business owner can access this endpoint.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateRestaurantListingInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateRestaurantListingResponse'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Internal Server Error
 */
router.post("/create-restaurant", createRestaurantController);

export default router;
