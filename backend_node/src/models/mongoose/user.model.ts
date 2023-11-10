import { Schema, model } from "mongoose";
import { IUser } from "../../interface/UserInterface";

const UserSchema = new Schema<IUser>(
  {
    user_name: { type: String, require: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["ADMIN_ROL", "USER_ROL"],
      default: ["USER_ROL"],
      required: true,
    },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// eslint-disable-next-line func-names
UserSchema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export const UserModel = model<IUser>("User", UserSchema);
