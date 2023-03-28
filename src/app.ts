import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import mongoose from "mongoose";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter, userRouter } from "./routes";

const app = express();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use((err: ApiError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});
mongoose.set("strictQuery", true);
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.API_URL);
  cronRunner();
  // eslint-disable-next-line no-console
  console.log(`Server started on port: ${configs.PORT}`);
});
