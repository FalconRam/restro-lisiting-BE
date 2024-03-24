import { Request, Response } from "express";
import { z as zod } from "zod";
import bcrypt from "bcryptjs";

import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/createResponse";
import { User, BusinessOwner, Admin } from "../models/user";
import { UserRequestBody, UserType } from "../utils/types";
import { signJWTToken } from "../services/jwtService";
import { zodAuthValidationService } from "../services/zodValidationService";

/**
 * @Description Responsible create New User Credential
 *
 * @Request
 * { emailId: string, password: string, userType: UserType } req.body - User information.
 *
 * @Response
 * { _id: string, userName: string, emailId: string, userType: UserType, accessToken: string, createdAt: Date, updatedAt: Date } User data with access token.
 */
export const createUserController = async (req: Request, res: Response) => {
  try {
    const valResult = zodAuthValidationService.createUserBody(req.body);

    if (!valResult.success)
      return createErrorResponse(res, 400, {}, "Request Format Invalid");

    const { userName, emailId, password, userType }: UserRequestBody = req.body;

    const existingUser = await User.findOne({ emailId });

    if (existingUser)
      return createErrorResponse(res, 411, {}, "EmailId already Registered");

    const hashedPassword = await bcrypt.hash(password, 12);

    let newUser;

    // Create a New User as per role, BusinessOwner & Admin inherit User model
    if (userType === UserType.bo) {
      newUser = await BusinessOwner.create({
        userName,
        emailId,
        password: hashedPassword,
        userType,
      });
    } else if (userType === UserType.admin) {
      newUser = await Admin.create({
        userName,
        emailId,
        password: hashedPassword,
        userType,
      });
    } else
      newUser = await User.create({
        userName,
        emailId,
        password: hashedPassword,
        userType,
      });

    // Generate JWT access Token
    const accessToken = await signJWTToken({
      _id: newUser._id,
      emailId: newUser.emailId,
      userType: newUser.userType,
    });

    // Construct User date and Exclude Password
    const selectedUserData = {
      _id: newUser._id,
      userName: newUser.userName,
      emailId: newUser.emailId,
      userType: newUser.userType,
      accessToken,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return createSuccessResponse(res, 201, selectedUserData, "User Created");
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

/**
 * @Description Responsible for Validate the User Credential and log in
 *
 * @Request
 * { emailId: string, password: string } req.body - User login credentials.
 *
 * @Response
 * { _id: string, userName: string, emailId: string, userType: UserType, accessToken: string, createdAt: Date, updatedAt: Date } User data with access token.
 */
export const loginController = async (req: Request, res: Response) => {
  try {
    const valResult = zodAuthValidationService.loginUserBody(req.body);

    if (!valResult.success)
      return createErrorResponse(res, 400, {}, "Request Format Invalid");

    const { emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId })
      .select("-updatedAt -__v")
      .lean();

    if (!existingUser)
      return createErrorResponse(res, 404, {}, "Incorrect Account Details");

    if (!bcrypt.compareSync(password, existingUser.password))
      return createErrorResponse(res, 404, {}, "Incorrect Account Details");

    // Generate JWT access Token
    const accessToken = await signJWTToken({
      _id: existingUser._id,
      emailId: existingUser.emailId,
      userType: existingUser.userType,
    });

    // Construct User date and Exclude Password
    const selectedUserData = {
      _id: existingUser._id,
      userName: existingUser.userName,
      emailId: existingUser.emailId,
      userType: existingUser.userType,
      accessToken,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    };

    return createSuccessResponse(res, 200, selectedUserData, "Login Success!");
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};
