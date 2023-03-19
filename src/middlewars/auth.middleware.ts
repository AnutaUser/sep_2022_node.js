import { NextFunction, Request, Response } from "express";

import { EActionTokenType, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { Action, Token } from "../models";
import { tokenService } from "../services";

class AuthMiddleware {
  public async isAccessTokenValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        return next(new ApiError("No token", 401));
      }

      const jwtPayload = tokenService.checkToken(accessToken);

      const tokenInfo = await Token.findOne({ accessToken });

      if (!tokenInfo) {
        return next(new ApiError("Token not valid", 401));
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isRefreshTokenValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        return next(new ApiError("No token", 401));
      }

      const jwtPayload = tokenService.checkToken(
        refreshToken,
        ETokenType.refreshToken
      );
      const tokenInfo = await Token.findOne({ refreshToken });

      if (!tokenInfo) {
        return next(new ApiError("not valid token", 401));
      }

      req.res.locals = { tokenInfo, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }

  public isActionTokenValid(actionTokenType: EActionTokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const actionToken = req.params.token;

        if (!actionToken) {
          return next(new ApiError("No token", 401));
        }

        const jwtPayload = tokenService.checkActionToken(
          actionToken,
          actionTokenType
        );

        const tokenInfo = await Action.findOne({ actionToken });

        if (!tokenInfo) {
          return next(new ApiError("Not valid token", 401));
        }

        req.res.locals = { tokenInfo, jwtPayload };
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const authMiddleware = new AuthMiddleware();
