import { config } from "dotenv";

config();

export const configs = {
  PORT: process.env.PORT || 5555,
  API_URL: process.env.API_URL || "https://google.com",

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh",

  JWT_ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET || "activate",
  JWT_FORGOT_SECRET: process.env.JWT_FORGOT_SECRET || "forgot",

  EMAIL_USER: process.env.EMAIL_USER || "user",
  EMAIL_PASS: process.env.EMAIL_PASS || "pass",

  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "twilioSID",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || "twilioToken",
  TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID || "twilioServiceSid",

  FRONTEND_URL: process.env.FRONTEND_URL || "https://google.com",

  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,

  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_PASSWORD: process.env.AWS_S3_PASSWORD,
  AWS_S3_URL: process.env.AWS_S3_URL,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_ACL: process.env.AWS_S3_ACL,
};
