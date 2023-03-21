import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const OldPasswordSchema = new Schema({
  _user_id: {
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
  password: {
    type: String,
    required: true,
  },
});

export const OldPassword = model("OldPassword", OldPasswordSchema);
