import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { UserValidator } from "../validators";

class AuthMiddleware {
  public async isDataValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = await UserValidator.userLogin.validate(req.body);

      if (error) {
        return next(
          new ApiError(400, "Wrong email or password from middleware")
        );
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
