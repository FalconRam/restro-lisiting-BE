import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import rootRouter from "./routes/index";
import { createSuccessResponse } from "./services/createResponse";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();

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

// To Check if app is up!
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
  })
  .catch((err) => console.log(err));
