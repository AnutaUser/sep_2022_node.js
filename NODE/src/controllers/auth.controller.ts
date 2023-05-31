import { NextFunction, Request, Response } from "express";

import { oauthService } from "../services";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(res.locals.password);
      console.log(req.body.password);
      await oauthService.comparePassword(
        res.locals.password,
        req.body.password
      );
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
