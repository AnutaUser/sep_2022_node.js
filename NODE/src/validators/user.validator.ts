import Joi from "joi";

import { regexConstant } from "../constants";
import { EGender } from "../enums";

export class UserValidator {
  private static userName = Joi.string().min(2).max(50).trim();
  private static age = Joi.number().min(2).max(130);
  private static gender = Joi.valid(...Object.values(EGender));
  private static email = Joi.string().regex(regexConstant.EMAIL);
  private static password = Joi.string().regex(regexConstant.PASSWORD);

  static userForCreate = Joi.object({
    name: this.userName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static userForUpdate = Joi.object({
    name: this.userName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
  });

  static userLogin = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
