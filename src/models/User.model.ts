import { model, Schema } from "mongoose";

import { EGenders } from "../types/user.types";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    gender: {
      enum: EGenders,
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const User = model("user", userSchema);
