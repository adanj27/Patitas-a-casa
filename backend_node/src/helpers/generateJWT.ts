import jwt from "jsonwebtoken";
import { TOKEN } from "./constanst";

export class JWT {
  static async create({ user }) {
    try {
      const token = jwt.sign(
        {
          id: user.id,
          alias: user.alias,
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
      return jwt.verify(token, TOKEN.SECRET);
    } catch (error) {
      throw Error(error);
    }
  }
}
