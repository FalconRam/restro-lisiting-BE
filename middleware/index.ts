import { Request, Response, NextFunction } from "express";
import { createErrorResponse } from "../services/createResponse";
import { validateJWTToken } from "../services/jwtService";
import { UserType } from "../utils/types";

/**
 *@function authMiddlware
 *
 * @description
 * - General Authentication middleware
 * - Set _id, emailId * userType on req
 *
 */
export const authMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return createErrorResponse(res, 401, {}, "Unauthorized");

    const decodedToken = await validateJWTToken(token);

    // If false is returned then, the token is Expired or Not Valid, hence throw 403 http code
    if (decodedToken === false)
      return createErrorResponse(res, 403, {}, "Forbidden Access");

    if (typeof decodedToken !== "boolean")
      [req._id, req.emailId, req.userType] = [
        decodedToken._id,
        decodedToken.emailId,
        decodedToken.userType,
      ];
    next();
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

/**
 *@function adminBoMiddleware
 *
 * @description
 * - To check bo & admin can access routes
 *
 */
export const adminBoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userType === UserType.user)
      return createErrorResponse(
        res,
        401,
        {},
        "Access Denied based on Buisness Rule"
      );

    if (req.userType === UserType.bo || req.userType === UserType.admin)
      return next();

    return createErrorResponse(
      res,
      401,
      {},
      "Access Denied based on Buisness Rule"
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

/**
 *@function adminUserMiddleware
 *
 * @description
 * - To check user & admin can access routes
 *
 */
export const adminUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userType === UserType.bo)
      return createErrorResponse(
        res,
        401,
        {},
        "Access Denied based on Buisness Rule"
      );

    if (req.userType === UserType.user || req.userType === UserType.admin)
      return next();

    return createErrorResponse(
      res,
      401,
      {},
      "Access Denied based on Buisness Rule"
    );
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

/**
 *@function businessOwnerMiddlware
 *
 * @description
 * - To check Business Owner can only access routes
 *
 */
export const businessOwnerMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userType === UserType.user || req.userType === UserType.admin)
      return createErrorResponse(
        res,
        401,
        {},
        "Access Denied based on Buisness Rule"
      );
    next();
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};

/**
 *@function adminMiddlware
 *
 * @description
 * - To check Admin can only access routes
 *
 */
export const adminMiddlware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.userType === UserType.user || req.userType === UserType.bo)
      return createErrorResponse(
        res,
        401,
        {},
        "Access Denied based on Buisness Rule"
      );
    next();
  } catch (error: any) {
    createErrorResponse(res, 500, {}, error.messsage || error.stack || error);
  }
};
