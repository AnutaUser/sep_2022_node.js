import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ILogin, ITokenPair, ITokenPayload, IUser } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(user: IUser): Promise<void> {
    try {
      const { password } = user;
      const hashedPass = await passwordService.hashPassword(password);
      await User.create({ ...user, password: hashedPass });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(loginData: ILogin, user: IUser): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.comparePassword(
        loginData.password,
        user.password
      );

      if (!isMatched) {
        await new ApiError("wrong email or password", 401);
      }

      const tokenPair = tokenService.generateTokens({
        _id: user._id,
        name: user.name,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokens = tokenService.generateTokens({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokens }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokens;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
