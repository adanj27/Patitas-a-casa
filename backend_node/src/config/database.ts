import mongoose, { ConnectOptions } from "mongoose";
import { APP_CONFIG, DB_CONN } from "../helpers/constanst";

let database: mongoose.Connection;

const connection = APP_CONFIG.ENV !== "production" ? DB_CONN.TEST : DB_CONN.DEV;

export const connectionDB = async () => {
  if (database) {
    return;
  }
  mongoose.set("strictQuery", false);
  await mongoose.connect(connection, {} as ConnectOptions);

  database = mongoose.connection;
  console.log(`connected to the database  successfully is time Work! `);
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  mongoose.disconnect();
};
