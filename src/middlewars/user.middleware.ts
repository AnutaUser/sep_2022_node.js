import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { User } from "../models";
import { UserValidator } from "../validators";

class UserMiddleware {
  public async getByIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);

      if (!user) {
        return next(new ApiError("User not found", 422));
      }

      res.locals = user;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidForCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);

      if (error) {
        return next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidForUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.updateUser.validate(req.body);

      if (error) {
        return next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isIdValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        return next(new ApiError("Id is not valid", 400));
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
