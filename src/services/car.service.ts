import { Types } from "mongoose";

import { ApiError } from "../errors";
import { Car } from "../models";
import { carRepository } from "../repositories";
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
      return await carRepository.getByCarAndUser(userId, carId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async create(
    car: ICar,
    userId: Types.ObjectId | string
  ): Promise<void> {
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

  public async delete(id: Types.ObjectId | string): Promise<void> {
    try {
      await Car.findByIdAndDelete(id);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const carService = new CarService();
