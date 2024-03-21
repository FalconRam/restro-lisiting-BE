import express from "express";
import {
  createUserController,
  loginController,
} from "../../controllers/authController";

const router = express.Router();

router.post("/create-user", createUserController);

router.post("/signin", loginController);

export default router;
