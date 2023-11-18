import { Schema, model } from "mongoose";
import { IImage } from "../../interface";

const ImageSchema = new Schema<IImage>(
  {
    url: { type: String, require: true },
    public_id: { type: String, require: true }, // id_Cloudinary
    model_id: { type: Schema.Types.ObjectId, require: true },
    model_type: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ImageModel = model<IImage>("Image", ImageSchema);
