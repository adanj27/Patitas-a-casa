import { Schema, model } from "mongoose";
import {
  IForm,
  PETSIZE_TYPE,
  PET_TYPE,
} from "../../interface/props/FormInterface";

const FormSchema = new Schema<IForm>(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    size: {
      type: String,
      enum: [PETSIZE_TYPE.SMALL, PETSIZE_TYPE.MEDIUM, PETSIZE_TYPE.LARGE],
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
    type: { type: String, enum: [PET_TYPE.CAT, PET_TYPE.DOG], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const FormModel = model<IForm>("Form", FormSchema);
