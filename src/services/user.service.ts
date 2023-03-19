import { EEmailActions } from "../enums";
import { ApiError } from "../errors";
import { User } from "../models";
import { IUser } from "../types";
import { emailService } from "./email.service";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return User.findById(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(user: IUser): Promise<void> {
    try {
      await User.create(user);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async update(id: string, user: IUser): Promise<void> {
    try {
      await User.findByIdAndUpdate(id, { ...user }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string, email: string, name: string): Promise<void> {
    try {
      await User.findByIdAndDelete(id);
      await emailService.sendMail(email, EEmailActions.DELETE_ACCOUNT, {
        name,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
