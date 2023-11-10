import { Schema, model } from "mongoose";

const ImageSchema = new Schema(
  {
    url: { type: String, require: true },
    model_id: { type: Schema.Types.ObjectId, require: true },
    model_type: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ImageModel = model("Image", ImageSchema);
