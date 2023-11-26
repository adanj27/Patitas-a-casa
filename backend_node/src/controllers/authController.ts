import { Request, Response } from "express";
import { ApiResponse, Errors, IUser } from "../interface";
import {
  AuthResetTypeB,
  AuthResetTypeP,
  AuthType,
  CreateUserType,
} from "../schema";
import { UserRepository } from "../models/repositorie/UserRepository";
import {
  BREVO_CONFIG,
  IAuth,
  JWT,
  TOKEN,
  setAccessTokenCookie,
} from "../helpers";
import { ServiceSMTP } from "../services/sendinblue/service";
import { RolRepository } from "../models/repositorie";
import { AuthRequest } from "../middlware/authorization";

const User = new UserRepository();
const Rol = new RolRepository();
const ServiceEmail = new ServiceSMTP(BREVO_CONFIG.APIKEY);

export class AuthController {
  static async Register(
    req: Request<unknown, unknown, CreateUserType>,
    res: Response,
  ) {
    let result;
    const { first_name, last_name, alias, email, password, phone } = req.body;
    try {
      const assingRole = await Rol.getByOne({ name: "user" });

      const newUser = await User.create({
        first_name,
        last_name,
        alias,
        password,
        email,
        phone,
        rol: assingRole._id,
      });

      if (newUser) {
        const data = await ServiceEmail.AddContact({
          email: newUser.email,
        });

        if (!data.status) {
          return res
            .status(404)
            .json({ status: data.status, message: `Brevo: ${data.message}` });
        }

        result = await newUser.save();

        if (!result) {
          return res.status(404).json({
            status: false,
            message: "Error user dont create",
          });
        }
      }
      await ServiceEmail.AddContact({ email: newUser.email });

      const response: ApiResponse<IUser> = {
        status: true,
        message: "User create",
      };

      return res.status(201).json(response);
    } catch (error) {
      if (error.code === 11000)
        return res
          .status(404)
          .json({ status: false, message: "This email or alias alredy exist" });

      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async login(req: Request<unknown, unknown, AuthType>, res: Response) {
    try {
      const validUser = await User.getByOne({ email: req.body.email });

      if (!validUser) {
        return res
          .status(404)
          .json({ status: false, message: "Error data no valid!" });
      }

      const validPass = await User.ValidatePassword(
        req.body.password,
        validUser.password,
      );

      if (!validPass) {
        return res
          .status(404)
          .json({ status: false, message: "Error data no valid!" });
      }

      const user: IAuth = {
        id: validUser._id,
        alias: validUser.alias,
        rol: validUser.rol._id,
      };

      const mytoken = await JWT.create(user);

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
      return res.status(500).json(Errors.ERROR_DATABASE(error));
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

  static async resetPassword(
    req: Request<AuthResetTypeP, unknown, AuthResetTypeB> & AuthRequest<IAuth>,
    res: Response,
  ) {
    const { oldpassword, newpassword } = req.body;
    try {
      if (oldpassword === newpassword) {
        return res
          .status(404)
          .json({ status: false, message: "Try a different password" });
      }

      const exist = await User.getById(req.user.id);

      if (!exist || !exist.status) {
        return res
          .status(404)
          .json({ status: false, message: "User dont found" });
      }

      const validPass = await User.ValidatePassword(
        oldpassword,
        exist.password,
      );

      if (!validPass) {
        return res
          .status(404)
          .json({ message: "your password does not match" });
      }

      const newPass = await User.ResetPass({ password: newpassword });
      exist.password = newPass;
      await exist.save();

      return res
        .status(200)
        .json({ status: true, message: "Password Update!" });
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }
}
