import { Schema, model } from "mongoose";
import { IPet } from "../../interface/props/PetInterface";

const PetSchema = new Schema<IPet>(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    size: {
      type: String,
      enum: ["grande", "pequeño", "mediano"],
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
    type: { type: String, enum: ["dog", "cat", "others"], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PetModel = model<IPet>("Form", PetSchema);
export { PetModel };
