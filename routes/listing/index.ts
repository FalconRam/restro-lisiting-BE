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

router.get("/", getAllRestaurantsController);

// Only Accessed by UserType - admin
router.delete("/", adminMiddlware, deleteRestaurantController);

// Below are accessed only by UserType - admin, bo
router.use(adminBoMiddleware);

router.patch("/", updateRestaurantController);
router.post("/create-restaurant", createRestaurantController);

export default router;
