import { Schema, model } from "mongoose";
import {
  IForm,
  PETSEARCH_TYPE,
  PETSIZE_TYPE,
  PET_TYPE,
} from "../../interface/props/FormInterface";

const FormSchema = new Schema<IForm>(
  {
    name: { type: String },
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
    image_url: { type: String, required: true },
    // image_url: { type: Schema.Types.ObjectId, ref: "Image" },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    type: { type: String, enum: [PET_TYPE.CAT, PET_TYPE.DOG], required: true },
    type_search: {
      type: String,
      enum: [PETSEARCH_TYPE.FOUND, PETSEARCH_TYPE.LOST],
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FormModel = model<IForm>("Form", FormSchema);
