import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { EFrom } from "../enums";
import { ApiError } from "../errors";

class CommonMiddleware {
  public isIdValid(idField: string, from: EFrom = EFrom.params) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req[from][idField])) {
          return next(new ApiError("ID not valid", 400));
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);

        if (error) {
          return next(new ApiError(error.message, 400));
        }

        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();