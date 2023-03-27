import { Types } from "mongoose";

import { Car } from "../models";
import { ICar } from "../types";

class CarRepository {
  public async getByCarAndUser(userId: string, carId: string): Promise<ICar> {
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
  }
}

export const carRepository = new CarRepository();
