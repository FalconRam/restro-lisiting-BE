import express from "express";
import {
  createUserController,
  loginController,
} from "../../controllers/authController";

const router = express.Router();

/**
 * @openapi
 * '/api/v1/auth/create-user':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a New User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      411:
 *        description: Length Required
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal Server Error
 */
router.post("/create-user", createUserController);

/**
 * @openapi
 * '/api/v1/auth/signin':
 *  post:
 *     tags:
 *     - User
 *     summary: Login User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      404:
 *        description: Not found
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal Server Error
 */
router.post("/signin", loginController);

export default router;
