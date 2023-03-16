import { EEmailActions, ESmsActions } from "../enums";
import { ApiError } from "../errors";
import { Token, User } from "../models";
import { ILogin, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(user: IUser): Promise<void> {
    try {
      const { password, name } = user;
      const hashedPass = await passwordService.hash(password);

      await User.create({ ...user, password: hashedPass });

      await Promise.all([
        emailService.sendMail(user.email, EEmailActions.WELCOME, name),
        smsService.sendSms(user.phone, ESmsActions.WELCOME),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(loginData: ILogin, user: IUser): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        loginData.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("wrong email or password", 401);
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

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user = await User.findById(userId);

      const isMatched = await passwordService.compare(
        oldPassword,
        user.password
      );

      if (!isMatched) {
        throw new ApiError("Wrong old password", 400);
      }

      const hashedNewPass = await passwordService.hash(newPassword);

      await User.updateOne({ _id: user._id }, { password: hashedNewPass });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
