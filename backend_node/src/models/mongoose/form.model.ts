import { Schema, model } from "mongoose";
import { IForm } from "../../interface/FormInterface";

const FormSchema = new Schema<IForm>(
  {
    name: { type: String, require: true, unique: true },
    image_url: { type: Schema.Types.ObjectId, require: true },
    date: { type: Schema.Types.Date },
    contact: { type: String, require: true },
    zone: { type: String, require: true },
    size: { type: String, require: true },
    type: { type: String, enum: ["dog", "cat", "others"], require: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const FormModel = model<IForm>("Form", FormSchema);
export { FormModel };
