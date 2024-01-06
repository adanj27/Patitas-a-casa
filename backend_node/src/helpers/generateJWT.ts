import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { TOKEN } from "./constanst";

export interface IAuth {
  id: string;
  alias: string;
  email: string;
  rol: mongoose.Types.ObjectId;
}
export class JWT {
  static async create(user: IAuth) {
    try {
      const token = jwt.sign(
        {
          id: user.id,
          alias: user.alias,
          email: user.email,
          rol: user.rol,
        },
        TOKEN.SECRET,
        {
          expiresIn: TOKEN.TIME,
        },
      );
      return token;
    } catch (error) {
      throw Error(error);
    }
  }

  static async verify(token: string) {
    try {
      const decoded = jwt.verify(token, TOKEN.SECRET);
      return decoded as jwt.JwtPayload;
    } catch (error) {
      throw Error(error);
    }
  }
}
