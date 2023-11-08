import { Schema, model } from "mongoose";
import { IPet } from "../../interface/PetInterface";

const PetSchema = new Schema<IPet>(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    size: {
      type: String,
      enum: ["SMALL", "MEDIUM", "LARGE"],
      required: true,
    },
    city: { type: String, required: true },
    address: { type: String, required: true },
    reward: { type: Number },
    contact: { type: String, required: true },
    loss_date: { type: Schema.Types.Date },
    image_url: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    type: { type: String, enum: ["DOG", "CAT", "OTHERS"], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PetModel = model<IPet>("Pet", PetSchema);
export { PetModel };
