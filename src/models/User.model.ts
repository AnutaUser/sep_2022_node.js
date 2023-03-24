import { model, Schema } from "mongoose";

import { EGenders, EUserStatus } from "../enums";
import { IUser, IUserModel } from "../types";

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
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: EUserStatus,
      default: EUserStatus.inactive,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.virtual("nameWithGender").get(function () {
  return `${this.name}, you are ${this.gender}`;
});

userSchema.statics = {
  async findByName(name: string): Promise<IUser[]> {
    return this.find({ name });
  },
};

userSchema.methods = {
  nameWithAge() {
    return `${this.name} is ${this.age} years old`;
  },
};

export const User = model<IUser, IUserModel>("user", userSchema);
