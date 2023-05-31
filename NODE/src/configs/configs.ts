import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5555,
  API_URL: process.env.API_URL || "sxedcrfvygtbhuijkolpokijuhygt",
};
