import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ILogin, ITokenPair, IUser } from "../types";
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
        throw new ApiError("wrong email or password", 401);
      }

      const tokenPair = tokenService.generateTokens({
        id: user._id,
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
}

export const authService = new AuthService();
