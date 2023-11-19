import mongoose, { Date, Document } from "mongoose";

export const PETSIZE_TYPE = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
};

export const PET_TYPE = {
  DOG: "DOG",
  CAT: "CAT",
};

export type PetSizeOption = keyof typeof PETSIZE_TYPE;
export type PetType = keyof typeof PET_TYPE;

export interface IForm extends Document {
  name: string;
  color: string;
  size: PetSizeOption;
  city: string;
  address: string;
  reward: number;
  contact: string;
  loss_date: Date;
  image_url: mongoose.Types.ObjectId; // ref 'image'
  description: string;
  status: boolean;
  type: PetType;
}
