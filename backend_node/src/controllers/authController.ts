import { Request, Response } from "express";
import { ApiResponse, Errors, IUser } from "../interface";
import {
  AuthLoginType,
  AuthResetPassType,
  UserCreateType,
  ValidateIdType,
} from "../schema";
import { UserRepository, RolRepository } from "../models/repositorie";
import {
  BREVO_CONFIG,
  IAuth,
  JWT,
  TOKEN,
  setAccessTokenCookie,
} from "../helpers";
import { ServiceSMTP } from "../services/sendinblue/service";
import { AuthRequest, handlerHttpError } from "../middlware";

const User = new UserRepository();
const Rol = new RolRepository();
const ServiceEmail = new ServiceSMTP(BREVO_CONFIG.APIKEY);

export class AuthController {
  static async Register(
    req: Request<unknown, unknown, UserCreateType>,
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
          return handlerHttpError(
            res,
            Errors.MSG("Error user dont create").message,
            404,
          );
        }
      }

      try {
        await ServiceEmail.AddContact({ email: newUser.email });
      } catch (error) {
        console.error(error);
      }

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

      return handlerHttpError(res, Errors.ERROR(error).message);
    }
  }

  static async login(
    req: Request<unknown, unknown, AuthLoginType>,
    res: Response,
  ) {
    try {
      const existUser = await User.getByOne({ email: req.body.email });

      if (!existUser) {
        return handlerHttpError(res, Errors.DATA_ERROR.message, 404);
      }

      const validPass = await User.ValidatePassword(
        req.body.password,
        existUser.password,
      );

      if (!validPass) {
        return handlerHttpError(res, Errors.DATA_ERROR.message, 404);
      }

      const user: IAuth = {
        id: existUser._id,
        alias: existUser.alias,
        rol: existUser.rol._id,
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
      return handlerHttpError(res, Errors.ERROR(error).message);
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
    req: Request<ValidateIdType, unknown, AuthResetPassType> &
      AuthRequest<IAuth>,
    res: Response,
  ) {
    const { oldpassword, newpassword } = req.body;
    try {
      if (oldpassword === newpassword) {
        return handlerHttpError(
          res,
          Errors.MSG("Try a different password").message,
          404,
        );
      }

      const exist = await User.getById(req.user.id);

      if (!exist || !exist.status) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 404);
      }

      const validPass = await User.ValidatePassword(
        oldpassword,
        exist.password,
      );

      if (!validPass) {
        return handlerHttpError(
          res,
          Errors.MSG("your password does not match").message,
          404,
        );
      }

      const newPass = await User.ResetPass({ password: newpassword });
      exist.password = newPass;
      await exist.save();

      return res
        .status(200)
        .json({ status: true, message: "Password Update!" });
    } catch (error) {
      return handlerHttpError(res, Errors.ERROR(error).message);
    }
  }
}
