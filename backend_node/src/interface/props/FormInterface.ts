import mongoose, { Date, Document } from "mongoose";

export interface IForm extends Document {
  name: string;
  color: string;
  size: string;
  city: string;
  address: string;
  reward: number;
  contact: string;
  loss_date: Date;
  image_url: mongoose.Types.ObjectId; // ref 'image'
  description: string;
  status: boolean;
  type: string;
}
