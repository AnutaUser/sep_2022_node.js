import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors";
import { User } from "../models";
import { IRequest } from "../types";
import { UserValidator } from "../validators";

class UserMiddleware {
  // public async getByIdOrThrow(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const { userId } = req.params;
  //     const user = await User.findById(userId);
  //
  //     if (!user) {
  //       return next(new ApiError(422, "User not found"));
  //     }
  //
  //     res.locals = user;
  //     next();
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public getUserDynamically(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (
      req: IRequest,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const fieldValue = req[from][fieldName];

        const user = await User.findOne({ [dbField]: fieldValue });

        if (!user) {
          return next(new ApiError(422, "User not found"));
        }

        res.locals = user;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isUserValidForCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.userForCreate.validate(req.body);

      if (error) {
        return next(new ApiError(400, error.message));
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
      const { error, value } = UserValidator.userForUpdate.validate(req.body);

      if (error) {
        return next(new ApiError(400, error.message));
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
        return next(new ApiError(400, "Id is not valid"));
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
