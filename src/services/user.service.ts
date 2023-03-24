import { EEmailActions } from "../enums";
import { ApiError } from "../errors";
import { User } from "../models";
import { IPaginationResponse, IQuery, IUser } from "../types";
import { emailService } from "./email.service";

class UserService {
  public async getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getAllWithPagination(
    query: IQuery
  ): Promise<IPaginationResponse<IUser>> {
    try {
      const queryStr = JSON.stringify(query);
      const queryObj = JSON.parse(
        queryStr.replace(/\b(lte|gte|lt|gt)\b/, (match) => `$${match}`)
      );

      const {
        page = 1,
        limit = 5,
        sortedBy = "createdAt",
        ...searchObj
      } = queryObj;

      const skip = limit * (page - 1);

      const data = await User.find(searchObj)
        .skip(skip)
        .limit(limit)
        .sort(sortedBy)
        .lean();

      const count = await User.count();
      //
      // const users = await User.findByName("Ania");
      // console.log(users);

      return {
        page: +page,
        perPage: +limit,
        itemsCount: count,
        itemsFound: data.length,
        data,
      };
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
}

export const userService = new UserService();
