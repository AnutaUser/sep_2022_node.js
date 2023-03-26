import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Car } from "../models";
import { ICar } from "../types";

class CarService {
  public async getAll(): Promise<ICar[]> {
    try {
      return Car.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(userId: string, carId: string): Promise<ICar> {
    try {
      // return await Car.findById(carId).populate("user");

      const result = await Car.aggregate([
        {
          $match: {
            _id: carId,
            user: new Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: {
            path: "$creator",
          },
        },
      ]);

      return result[0];
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(car: ICar, userId: string): Promise<void> {
    try {
      await Car.create({ ...car, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async update(id: string, car: ICar): Promise<void> {
    try {
      await Car.findByIdAndUpdate(id, { ...car }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await Car.findByIdAndDelete(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carService = new CarService();
