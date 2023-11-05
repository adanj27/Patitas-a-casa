import mongoose, { Date, Document } from "mongoose";

export interface IForm extends Document {
  name: string;
  image_url: mongoose.Types.ObjectId; // ref 'image'
  date: Date;
  contact: string;
  zone: string;
  size: string;
  type: string;
  description: string;
}
