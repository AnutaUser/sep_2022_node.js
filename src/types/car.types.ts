import { Types } from "mongoose";

import { IUser } from "./user.types";

export interface ICar {
  _id?: Types.ObjectId;
  brand: string;
  year: number;
  user: IUser | Types.ObjectId;
}