import { UserModel as User } from "../models/mongoose/user.model";

export const existEmail = async (email = "") => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error(`${email} email already exists`);
  }
};
