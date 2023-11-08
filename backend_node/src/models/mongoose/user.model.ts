import { Schema, model } from "mongoose";
import { IUser } from "../../interface/UserInterface";

const UserSchema = new Schema<IUser>(
  {
    user_name: { type: String, require: true, unique: true },
    email: { type: String, required: true },
    password: {
      type: String,
      enum: ["grande", "pequeño", "mediano"],
      required: true,
    },
    roles: {
      type: [String],
      enum: ["ADMIN_ROL", "USER_ROL"],
      default: ["USER_ROL"],
      required: true,
    },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    status: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = model<IUser>("User", UserSchema);
export { UserModel };
