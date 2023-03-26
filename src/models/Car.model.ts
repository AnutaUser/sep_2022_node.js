import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    year: {
      type: String,
      required: [true, "Year is required"],
      trim: true,
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Car = model("car", carSchema);
