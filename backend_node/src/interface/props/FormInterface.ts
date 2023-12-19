import { Date, Document } from "mongoose";

export const PETSIZE_TYPE = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
};

export const PET_TYPE = {
  DOG: "DOG",
  CAT: "CAT",
};

export const PETSEARCH_TYPE = {
  LOST: "LOST",
  FOUND: "FOUND",
};

type PetSizeOption = keyof typeof PETSIZE_TYPE;
type PetType = keyof typeof PET_TYPE;
type PetSearchType = keyof typeof PETSEARCH_TYPE;

export interface IForm extends Document {
  name: string;
  color: string;
  size: PetSizeOption;
  city: string;
  address: string;
  reward: number;
  contact: string;
  loss_date?: Date | undefined;
  image_url: string;
  // image_url: mongoose.Types.ObjectId; // ref 'image'
  description: string;
  status: boolean;
  type: PetType;
  type_search: PetSearchType;
}
