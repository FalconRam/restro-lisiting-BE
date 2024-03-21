import express, { Request, Response } from "express";

import { createErrorResponse } from "../services/createResponse/index";

import authRotues from "./auth/index";
import listRotues from "./list/index";
import reviewRotues from "./review/index";

const router = express.Router();

router.use("/auth", authRotues);
router.use("/list", listRotues);
router.use("/review", reviewRotues);

router.use("*", (req: Request, res: Response) => {
  createErrorResponse(res, 404, {}, "Not Found");
});

export default router;
