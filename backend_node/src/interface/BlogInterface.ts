import mongoose, { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  sub_title: string;
  slug: string;
  short_description: string;
  image_url: mongoose.Types.ObjectId; // ref 'image'
  description: string;
  status: boolean;
  count_view: number;
}
