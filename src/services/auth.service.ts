import {
  EActionTokenType,
  EEmailActions,
  ESmsActions,
  EUserStatus,
} from "../enums";
import { ApiError } from "../errors";
import { Action, Token, User } from "../models";
import { OldPassword } from "../models/Old-password.model";
import { authRepository } from "../repositories";
import { ILogin, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(user: IUser): Promise<void> {
    try {
      const { name } = user;
      await authRepository.register(user);

      await Promise.all([
        emailService.sendMail(user.email, EEmailActions.WELCOME, { name }),
        smsService.sendSms(user.phone, ESmsActions.WELCOME, name),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(loginData: ILogin, user: IUser): Promise<ITokenPair> {
    try {
      return await authRepository.login(loginData, user);
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

      if (!isMatched) throw new ApiError("Wrong old password", 400);

      const hashedNewPass = await passwordService.hash(newPassword);

      await User.updateOne({ _id: user._id }, { password: hashedNewPass });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.forgot,
        "7d"
      );

      await Action.create({
        actionToken,
        actionType: EActionTokenType.forgot,
        _user_id: user._id,
      });

      await emailService.sendMail(user.email, EEmailActions.FORGOT_PASSWORD, {
        token: actionToken,
        name: user.name,
      });

      await OldPassword.create({ _user_id: user._id, password: user.password });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(
    password: string,
    userId: string
  ): Promise<void> {
    try {
      const hashedPass = await passwordService.hash(password);

      await User.updateOne({ _id: userId }, { password: hashedPass });

      await Token.deleteMany({
        _user_id: userId,
        actionType: EActionTokenType.forgot,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async sendActivateToken(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.activate,
        "1d"
      );

      await Action.create({
        actionToken,
        actionType: EActionTokenType.activate,
        _user_id: user._id,
      });

      await emailService.sendMail(user.email, EEmailActions.ACTIVATE, {
        token: actionToken,
        name: user.name,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(userId: string): Promise<void> {
    try {
      await User.updateOne(
        { _id: userId },
        { $set: { status: EUserStatus.active } }
      );

      await Token.deleteMany({
        _user_id: userId,
        tokenType: EActionTokenType.activate,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
