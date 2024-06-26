import jwt from "jsonwebtoken";
import { customJWTPayload } from "../utils/types";

export const signJWTToken = async (
  payload: customJWTPayload
): Promise<string> => {
  try {
    if (!process.env.JWT_TOKEN_SECRET_KEY)
      throw new Error("JWT secret key not set");

    const accessToken = await jwt.sign(
      payload,
      process.env.JWT_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.JWT_TOKEN_EXPIRY_HOURS,
      }
    );
    return accessToken;
  } catch (error: any) {
    throw new Error(error.messsage || error.stack || error);
  }
};

/**
 *@function validateJWTToken
 *
 * @description Validates if the Token is Valid,
 * if it not valid returns boolean false
 * It is Valid, returns boolean decoded date,
 * if isDataRequired sent as false, the return true only on valid token
 *
 */
export const validateJWTToken = async (
  token: string,
  isDataRequired: boolean = true
): Promise<customJWTPayload | boolean> => {
  try {
    if (!process.env.JWT_TOKEN_SECRET_KEY)
      throw new Error("JWT secret key not set");

    const decodedTokenData = (await jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET_KEY
    )) as customJWTPayload;
    return isDataRequired ? decodedTokenData : true;
  } catch (error: any) {
    return false as boolean;
  }
};
