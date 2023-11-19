import { Document } from "mongoose";

export interface IRol extends Document {
  name: string;
  description: string;
}

export interface IRolDocument extends IRol, Document {}
