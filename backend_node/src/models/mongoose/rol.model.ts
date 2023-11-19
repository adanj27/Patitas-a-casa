import { Model, Schema, model } from "mongoose";
import { IRol, IRolDocument } from "../../interface/props/RolInterface";

const RolSchema = new Schema<IRol>(
  {
    name: { type: String, unique: true, require: true },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RolModel = model<IRolDocument, Model<IRol>>("Role", RolSchema);
