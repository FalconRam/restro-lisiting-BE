import express, { Request, Response, Application, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import rootRouter from "./routes/index";
import { createSuccessResponse } from "./services/createResponse";
import mongoose from "mongoose";
import swaggerDocs from "./swagger";

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 5000;
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;

if (!PORT || !DB_CONNECTION_URL) throw new Error("Check Startup data provided");

app.use(
  express.json({
    limit: "30mb",
  })
);
app.use(
  express.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
app.use(cors());

/**
 * @openapi
 * /health:
 *  get:
 *     tags:
 *     - Health
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: To Check if app is up!
 */
app.get("/health", (req: Request, res: Response) => {
  createSuccessResponse(
    res,
    200,
    {
      message: "I'm Good",
      date: new Date().toLocaleString(),
    },
    ""
  );
});

// Distribute to root route
app.use("/api/v1", rootRouter);

// Establish DB Connection & Run Server
mongoose
  .connect(DB_CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
    swaggerDocs(app, PORT);
  })
  .catch((err) => console.log(err));
