import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  user_name: string;
  email: string;
  token: string;
  password: string;
  roles: string[];
  forms: mongoose.Types.ObjectId[];
  status: boolean;
}
