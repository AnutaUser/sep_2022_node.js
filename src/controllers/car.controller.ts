import { NextFunction, Request, Response } from "express";

import { carService } from "../services";
import { ICar, ICommonResponse, ITokenPayload } from "../types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getAll();
      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car, jwtPayload } = res.locals;

      const result = await carService.getById(jwtPayload._id, car._id);

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICar>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const car = await carService.create(req.body, _id);

      return res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICar>>> {
    try {
      const { carId } = req.params;
      const body = req.body;

      await carService.update(carId, body);

      return res.status(201).json({
        message: "Car updated",
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { carId } = req.params;

      await carService.delete(carId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const carController = new CarController();
