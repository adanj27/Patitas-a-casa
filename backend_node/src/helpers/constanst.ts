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

export const BREVO_CONFIG = {
  APIKEY: process.env.SENDINBLUE_KEY,
};

export const SMS = {
  EMAIL: process.env.SMTP_EMAIL,
};

export const CLOUDINARY = {
  NAME: process.env.CLOUDINARY_NAME,
  KEY: process.env.CLOUDINARY_KEY,
  API: process.env.CLOUDINARY_API,
};

export const IMAGE_TYPE = {
  IMAGE: "IMAGE",
  FORM: "FORM",
  BLOG: "BLOG",
};
