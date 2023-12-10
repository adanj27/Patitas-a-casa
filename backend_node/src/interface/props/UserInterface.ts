/* eslint-disable no-unused-vars */
import mongoose, { Document, Model } from "mongoose";
import { IForm } from "./FormInterface";
import { IBlog } from "./BlogInterface";
import { IShelter } from "./ShelterInterface";

export interface listNameArray {
  blogs: string;
  forms: string;
  shelters: string;
}

export type listOption = keyof listNameArray;

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  alias: string;
  password: string;
  status: boolean;
  rol: mongoose.Types.ObjectId; // ref rol
  forms: Array<mongoose.Types.ObjectId | IForm>; // ref form
  blogs: Array<mongoose.Types.ObjectId | IBlog>; // ref blogs
  shelters: Array<mongoose.Types.ObjectId | IShelter>;
}

/**
 * methods functions
 */
export interface IUserDocument extends IUser, Document {
  encryptPassword(password: string): Promise<string>;
}

/**
 * static functions
 */
export interface IUserModel extends Model<IUserDocument> {
  comparePassword(password: string, recivePassword: string): Promise<boolean>;
}
