import { config as initialDotenv } from "dotenv";

initialDotenv();

export const APP_CONFIG = {
  PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 8000,
  HOST: process.env.APP_HOST,
  ENV: process.env.APP_ENV,
  NAME: process.env.APP_NAME,
};

export const DB_CONN = {
  TEST: process.env.DB_STRING_CONNECTION_TEST,
  DEV: process.env.DB_STRING_CONNECTION,
};

export const TOKEN = {
  NAME: "access-token",
  SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH: process.env.REFRESH_TOKEN_SECRET,
  TIME: process.env.TOKEN_EXPIRES,
};

export const BREVO_CONFIG = {
  APIKEY: process.env.SENDINBLUE_KEY,
};

export const SMS = {
  EMAIL: process.env.EMAIL_CORPORATIVO,
};

export const USERADMIN = {
  ROL: process.env.ADMIN_ROL,
  NAME: process.env.ADMIN_NAME,
  LAST: process.env.ADMIN_LAST,
  ALIAS: process.env.ADMIN_ALIAS,
  PASS: process.env.ADMIN_PASS,
  EMAIL: process.env.ADMIN_EMAIL,
};

export const CLOUDINARY = {
  NAME: process.env.CLOUDINARY_NAME,
  KEY: process.env.CLOUDINARY_KEY,
  API: process.env.CLOUDINARY_API,
};
