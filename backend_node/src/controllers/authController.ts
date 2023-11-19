import { Request, Response } from "express";
import { ApiResponse, Errors, IUser } from "../interface";
import { AuthType, CreateUserType } from "../schema";
import { UserRepository } from "../models/repositorie/UserRepository";
import { JWT, TOKEN, setAccessTokenCookie } from "../helpers";

const User = new UserRepository();

export class AuthController {
  static async Register(
    req: Request<unknown, unknown, CreateUserType>,
    res: Response,
  ) {
    try {
      const newUser = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        alias: req.body.alias,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
      });

      if (!newUser) {
        throw Error("fail create user");
      }

      const response: ApiResponse<IUser> = {
        status: true,
        message: "User create",
      };

      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async login(req: Request<unknown, unknown, AuthType>, res: Response) {
    console.log("entroa");
    try {
      const validUser = await User.getByOne({ email: req.body.email });

      if (!validUser) {
        return res.status(404).json({ message: "Error data no valid!" });
      }

      const validPass = await User.ValidatePassword(
        req.body.password,
        validUser.password,
      );

      if (!validPass) {
        return res.status(404).json({ message: "Error data no valid!" });
      }

      const user = {
        id: validUser._id,
        alias: validUser.alias,
      };

      const mytoken = await JWT.create({ user });

      const response: ApiResponse<IUser> = {
        status: true,
        message: "logued",
      };

      if (mytoken) {
        setAccessTokenCookie(res, mytoken);

        return res.status(200).json({
          mytoken,
          response,
        });
      }
      return null;
    } catch (error) {
      throw Error(error);
    }
  }

  static async logout(req: Request, res: Response) {
    res.cookie(TOKEN.NAME, "");
    const response = {
      status: true,
      message: "diconnect",
    };
    return res.status(200).json(response);
  }

  static async resetPassword(req: Request, res: Response) {
    return res.send("pass");
  }
}
