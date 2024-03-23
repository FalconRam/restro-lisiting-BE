import express, { Request, Response } from "express";

import { createErrorResponse } from "../services/createResponse";

import authRotues from "./auth/index";
import listingRotues from "./listing/index";
import reviewRotues from "./review/index";

const router = express.Router();

router.use("/auth", authRotues);
router.use("/listing", listingRotues);
router.use("/review", reviewRotues);

router.use("*", (req: Request, res: Response) => {
  createErrorResponse(res, 404, {}, "Not Found");
});

export default router;
