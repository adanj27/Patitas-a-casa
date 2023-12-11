import slug from "mongoose-slug-generator";
import mongoose, { Schema, model } from "mongoose";
import { IBlog } from "../../interface/props/BlogInterface";

mongoose.plugin(slug);

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, require: true, unique: true },
    sub_title: { type: String, require: true },
    slug: { type: String, slug: "title" },
    description: { type: String, require: true },
    short_description: { type: String },
    image_url: { type: Schema.Types.ObjectId, ref: "Image" },
    status: { type: Boolean },
    isdeleted: { type: Boolean, default: false },
    count_view: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BlogModel = model<IBlog>("Blog", BlogSchema);
