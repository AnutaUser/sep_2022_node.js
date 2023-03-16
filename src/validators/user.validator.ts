import Joi from "joi";

import { regexConstant } from "../constants";
import { EGenders } from "../enums";

export class UserValidator {
  private static userName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstant.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstant.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));
  private static age = Joi.number().min(2).max(130);

  static createUser = Joi.object({
    name: this.userName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static updateUser = Joi.object({
    name: this.userName,
    age: this.age,
    gender: this.gender,
  });

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changePass = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
