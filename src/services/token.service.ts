import jwt from "jsonwebtoken";

import { authConstants } from "../constants";
import { ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, authConstants.JWT_ACCESS_SECRET, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(payload, authConstants.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

export const tokenService = new TokenService();
