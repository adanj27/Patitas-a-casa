import { config as initialDotenv } from "dotenv";

initialDotenv();

export const APP_CONFIG = {
  PORT: process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : undefined,
  HOST: process.env.APP_HOST,
  ENV: process.env.APP_ENV,
  NAME: process.env.APP_NAME,
};
