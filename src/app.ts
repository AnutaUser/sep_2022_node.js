import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "./models/User.model";
import { IUser } from "./types/user.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const users = await User.find();
    return res.json(users);
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { userId } = req.params;
    const user = await User.findById(userId);

    return res.json(user);
  }
);

app.post("/users", async (req: Request, res: Response) => {
  const body = req.body;

  const user = await User.create(body);

  res.status(201).json({
    message: "user created",
    data: user,
  });
});

app.patch("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const body = req.body;

  const user = await User.updateOne({ _id: userId }, { ...body });

  res.status(200).json({
    message: "User updated",
    data: user,
  });
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  await User.deleteOne({ _id: userId });

  res.sendStatus(200).json({
    message: "User deleted",
  });
});

const PORT = 4444;

app.listen(PORT, () => {
  mongoose.connect("mongodb://127.0.0.1:27017/sep_2022").then();
  console.log(`Server started on port: ${PORT}`);
});
