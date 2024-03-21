import jwt from "jsonwebtoken";
import { customJWTPayload } from "../utils/types";

export const signJWTToken = async (
  payload: customJWTPayload
): Promise<string> => {
  try {
    const accessToken = await jwt.sign(payload, "tempSec", {
      expiresIn: "1hr",
    });
    return accessToken;
  } catch (error: any) {
    return error.messsage || error.stack || error;
  }
};

export const validateJWTToken = async (
  token: string,
  isDataRequired: boolean = true
): Promise<customJWTPayload | boolean> => {
  try {
    const decodedTokenData = (await jwt.verify(
      token,
      "tempSec"
    )) as customJWTPayload;
    return isDataRequired ? decodedTokenData : true;
  } catch (error: any) {
    return false as boolean;
  }
};
