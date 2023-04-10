import { Model } from "mongoose";

export interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  itemsCount: number;
  itemsFound: number;
  data: T[];
}

export interface IQuery {
  page: string;
  limit: string;
  sortedBy: string;

  [key: string]: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  photo?: string;
}

export interface IUserMethods {
  nameWithAge(): string;
}

export interface IUserModel
  extends Model<IUser, object, IUserMethods, IUserVirtual> {
  findByName(name: string): Promise<IUser[]>;
}

export interface IUserVirtual {
  nameWithGender(): string;
}
