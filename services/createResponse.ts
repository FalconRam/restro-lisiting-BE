import { Response } from "express";

/**
 *@function createSuccessResponse
 *
 * @description return success response to client on success case
 *
 */
export const createSuccessResponse = (
  res: Response,
  statusCode: number,
  payload: {},
  customMessage: string
) => {
  return res.status(statusCode).json({
    status: true,
    data: payload,
    message: customMessage || "Success",
  });
};

/**
 *@function createErrorResponse
 *
 * @description return error response to client on failure case
 *
 */
export const createErrorResponse = (
  res: Response,
  statusCode: number,
  payload: {},
  customMessage: string
) => {
  return res.status(statusCode).json({
    status: false,
    data: payload,
    message: customMessage,
  });
};
