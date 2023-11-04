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
    toObject: {
      transform(doc, ret) {
        return {
          id: ret._id,
          model_id: ret.model_id,
          model_type: ret.model_type,
          url: ret.url,
        };
      },
    },
  },
);

export const ImageModel = model("Image", ImageSchema);
