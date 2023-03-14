import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5555,
  API_URL: process.env.API_URL || "awsedrftgyhujikosedrftgyh",

  SALT: process.env.PASSWORD_SALT || 8,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh",
};
