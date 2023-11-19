import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { IUser, IUserDocument } from "../../interface/props/UserInterface";

const UserSchema = new Schema<IUser>(
  {
    first_name: { type: String, requiere: true },
    last_name: { type: String, requiere: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, requiere: true },
    alias: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    rol: { type: Schema.Types.ObjectId, ref: "Role" },
    forms: [{ type: Schema.Types.ObjectId, ref: "Form" }],
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// eslint-disable-next-line func-names
UserSchema.pre<IUserDocument>("save", async function onSave(next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const hashPassword = await this.encryptPassword(this.password);

    this.password = hashPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

UserSchema.statics.comparePassword = async (
  password: string,
  recivePassword: string,
) => {
  const comparePassword = await bcrypt.compare(password, recivePassword);
  return comparePassword;
};

export const UserModel = model<IUser>("User", UserSchema);
