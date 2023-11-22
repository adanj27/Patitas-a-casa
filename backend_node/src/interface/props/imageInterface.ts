import mongoose, { Document } from "mongoose";

export const IMAGE_TYPE = {
  IMAGE: "IMAGE",
  FORM: "FORM",
  BLOG: "BLOG",
} as const;

export type ImageOption = keyof typeof IMAGE_TYPE;

export interface IImage extends Document {
  url: string;
  public_id: string;
  model_id: mongoose.Types.ObjectId;
  model_type: ImageOption;
}
