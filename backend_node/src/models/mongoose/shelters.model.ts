import { Schema, model } from "mongoose";
import { IShelter } from "../../interface/props/ShelterInterface";

const ShelterSchema = new Schema<IShelter>(
  {
    title: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    image_url: { type: Schema.Types.ObjectId, ref: "Image" },
    status: { type: Boolean },
    count_view: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ShelterModel = model<IShelter>("Shelter", ShelterSchema);
