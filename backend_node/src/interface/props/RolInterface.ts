import { Document } from "mongoose";
import { USERADMIN } from "../../helpers";

export const ROL_TYPE = {
  ghost: USERADMIN.ROL,
  admin: "admin",
  editor: "editor",
  user: "user",
} as const;

export type RolOption = keyof typeof ROL_TYPE;
export interface IRol extends Document {
  name: string;
  description: string;
}

export interface IRolDocument extends IRol, Document {}
