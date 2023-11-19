import slug from "mongoose-slug-generator";
import mongoose, { Schema, model } from "mongoose";

mongoose.plugin(slug);

const TagSchema = new Schema(
  {
    name: { type: String, require: true, unique: true },
    slug: { type: String, slug: "name" },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TagModel = model("Tag", TagSchema);
