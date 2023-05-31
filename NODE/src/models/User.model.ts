import { model, Schema } from "mongoose";

import { EGender } from "../enums";

const userSchema = new Schema(
  {
    name: { type: String },
    age: { type: String },
    gender: {
      enum: EGender,
      type: String,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email is required"],
      toLowerCase: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
    },
  },
  { versionKey: false }
);

export const User = model("user", userSchema);
