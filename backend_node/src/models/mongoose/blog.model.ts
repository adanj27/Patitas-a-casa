import slug from "mongoose-slug-generator";
import mongoose, { Schema, model } from "mongoose";

mongoose.plugin(slug);

const BlogSchema = new Schema(
  {
    title: { type: String, require: true, unique: true },
    sub_title: { type: String, require: true },
    slug: { type: String, slug: "title" },
    description: { type: String, require: true },
    short_description: { type: String },
    image_url: { type: Schema.Types.ObjectId, ref: "Image" },
    status: { type: Boolean },
    count_view: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform(doc, ret) {
        return {
          id: ret._id,
          title: ret.title,
          sub_title: ret.sub_title,
          description: ret.description,
          short_description: ret.short_description,
          image_url: ret.image_url,
          status: ret.status,
          count_view: ret.count_view,
        };
      },
    },
  },
);

export const BlogModel = model("Blog", BlogSchema);
