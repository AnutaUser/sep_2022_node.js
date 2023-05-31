import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return await User.find();
    } catch (e) {
      throw new ApiError(e.status, e.message);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return await User.findById(id);
    } catch (e) {
      throw new ApiError(e.status, e.message);
    }
  }

  public async create(data: IUser): Promise<void> {
    try {
      await User.create(data);
    } catch (e) {
      throw new ApiError(e.status, e.message);
    }
  }

  public async update(id: string, user: IUser): Promise<void> {
    try {
      await User.findByIdAndUpdate(id, user);
    } catch (e) {
      throw new ApiError(e.status, e.message);
    }
  }

  public async deleteById(id: string): Promise<void> {
    try {
      return await User.findByIdAndDelete(id);
    } catch (e) {
      throw new ApiError(e.status, e.message);
    }
  }
}

export const userService = new UserService();
