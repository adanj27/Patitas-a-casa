import { Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  sub_title: string;
  slug: string;
  short_description: string;
  image_url: string;
  description: string;
  isdeleted: boolean;
  status: boolean;
  count_view: number;
}
