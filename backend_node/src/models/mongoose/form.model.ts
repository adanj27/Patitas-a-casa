import { Schema, model } from "mongoose";
import { IForm } from "../../interface/props/FormInterface";

const FormSchema = new Schema<IForm>(
  {
    name: { type: String, required: true },
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

const FormModel = model<IForm>("Form", FormSchema);
export { FormModel };
