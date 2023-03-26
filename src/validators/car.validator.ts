import Joi from "joi";

import { regexConstant } from "../constants";

export class CarValidator {
  private static brand = Joi.string()
    .regex(regexConstant.CAR_BRAND)
    .lowercase()
    .trim();
  private static year = Joi.number().min(1990).max(new Date().getFullYear());
  private static price = Joi.number().min(0).max(1000000);

  static createCar = Joi.object({
    brand: this.brand.required(),
    year: this.year.required(),
    price: this.price.required(),
  });

  static updateCar = Joi.object({
    brand: this.brand,
    year: this.year,
    price: this.price,
  });
}
