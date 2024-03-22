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

router.use(authMiddlware); // All the Routes User general auth middleware

router.get("/", getAllRestaurantsController);

router.delete("/", adminMiddlware, deleteRestaurantController);

// Accessed only by Admin and Business Owner
router.use(adminBoMiddleware);

router.patch("/", updateRestaurantController);
router.post("/create-restaurant", createRestaurantController);

export default router;
