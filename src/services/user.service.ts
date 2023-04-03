import { UploadedFile } from "express-fileupload";

import { EEmailActions, EPhotoType } from "../enums";
import { ApiError } from "../errors";
import { User } from "../models";
import { userRepository } from "../repositories";
import { IPaginationResponse, IQuery, IUser } from "../types";
import { emailService } from "./email.service";
import { s3Service } from "./s3.service";

class UserService {
  // public async getAll(): Promise<IUser[]> {
  //   try {
  //     return User.find();
  //   } catch (e) {
  //     throw new ApiError(e.message, e.status);
  //   }
  // }

  public async getAllWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      return await userRepository.getAllWithPagination(query);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(id: string): Promise<IUser> {
    try {
      return await User.findById(id);
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

  public async uploadAvatar(file: UploadedFile, user: IUser): Promise<IUser> {
    try {
      const filePath = await s3Service.uploadPhoto(
        file,
        EPhotoType.user,
        user._id
      );

      if (user.photo) {
        await s3Service.deletePhoto(user.photo);
      }

      return await User.findByIdAndUpdate(
        user._id,
        { photo: filePath },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async deleteAvatar(user: IUser): Promise<IUser> {
    try {
      if (!user.photo) {
        throw new ApiError("Avatar doesnt exist", 422);
      }

      await s3Service.deletePhoto(user.photo);

      return await User.findByIdAndUpdate(
        user._id,
        { $unset: { photo: true } },
        { new: true }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
