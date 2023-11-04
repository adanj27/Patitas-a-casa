import { Schema, model } from "mongoose";

const FormSchema = new Schema(
  {
    name: { type: String, require: true, unique: true },
    contact_number: { type: String, require: true },
    slug: { type: String, slug: "name" },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const FormModel = model("Form", FormSchema);
export { FormModel };
