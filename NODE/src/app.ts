import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { authRouter, userRouter } from "./routes";
import { IError } from "./types";

const app = express();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use((err: IError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});
app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.API_URL);
  // eslint-disable-next-line no-console
  console.log(`Server started on port: ${configs.PORT}`);
});
