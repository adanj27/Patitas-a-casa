import mongoose, { Document } from "mongoose";

export interface IShelter extends Document {
  title: string;
  image_url: mongoose.Types.ObjectId; // ref 'image'
  description: string;
  status: boolean;
  count_view: number;
}
