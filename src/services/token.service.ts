import jwt from "jsonwebtoken";

import { configs } from "../configs";
import { EActionTokenType, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: "20m",
    });

    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(
    token: string,
    tokenType = ETokenType.accessToken
  ): ITokenPayload {
    try {
      let secret = "";

      switch (tokenType) {
        case ETokenType.accessToken:
          secret = configs.JWT_ACCESS_SECRET;
          break;
        case ETokenType.refreshToken:
          secret = configs.JWT_REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid1", 401);
    }
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    actionTokenType: EActionTokenType,
    expiresIn: string
  ): string {
    try {
      let secret = "";

      switch (actionTokenType) {
        case EActionTokenType.activate:
          secret = configs.JWT_ACTIVATE_SECRET;
          break;
        case EActionTokenType.forgot:
          secret = configs.JWT_FORGOT_SECRET;
          break;
      }

      return jwt.sign(payload, secret, { expiresIn });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public checkActionToken(
    token: string,
    tokenType: EActionTokenType
  ): IActionTokenPayload {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionTokenType.forgot:
          secret = configs.JWT_FORGOT_SECRET;
          break;
        case EActionTokenType.activate:
          secret = configs.JWT_ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid1", 401);
    }
  }
}

export const tokenService = new TokenService();
