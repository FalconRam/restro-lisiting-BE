import { TypeOf, z as zod } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - userName
 *         - emailId
 *         - password
 *         - userType
 *       properties:
 *         userName:
 *           type: string
 *           minLength: 3
 *           default: Admin Ram
 *           example: username
 *         emailId:
 *           type: string
 *           format: email
 *           default: adminram@gmail.com
 *           example: username@gmail.com
 *         password:
 *           type: string
 *           minLength: 6
 *           default: adminpass
 *           example: userpass
 *         userType:
 *           type: string
 *           enum: [admin, user, bo]
 *           default: admin
 *           example: user
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65fe79b1b576257cde2d913e"
 *         userName:
 *           type: string
 *           example: "Admin Ram"
 *         emailId:
 *           type: string
 *           example: "adminram@gmail.com"
 *         userType:
 *           type: string
 *           example: "admin"
 *         accessToken:
 *           type: string
 *           example: "accesstoken"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-23T06:21:36.315Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-23T06:21:36.315Z"
 *
 */

export const createUserSchema = zod.object({
  body: zod.object({
    userName: zod.string({
      required_error: "Name is required",
    }),
    password: zod
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
    emailId: zod
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    userType: zod.string({
      required_error: "User type is required",
    }),
  }),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginUserInput:
 *       type: object
 *       required:
 *         - emailId
 *         - password
 *       properties:
 *         emailId:
 *           type: string
 *           format: email
 *           default: adminram@gmail.com
 *         password:
 *           type: string
 *           minLength: 6
 *           default: adminpass
 *     LoginUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65fe79b1b576257cde2d913e"
 *         userName:
 *           type: string
 *           example: "Admin Ram"
 *         emailId:
 *           type: string
 *           example: "adminram@gmail.com"
 *         userType:
 *           type: string
 *           example: "admin"
 *         accessToken:
 *           type: string
 *           example: "accesstoken"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-23T06:21:36.315Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-23T06:21:36.315Z"
 *
 */

export const loginUserSchema = zod.object({
  body: zod.object({
    emailId: zod
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: zod
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
  }),
});

/**
 * Define the type for the input data
 */
export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
