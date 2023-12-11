import { Request, Response } from "express";
import { UserRepository } from "../models/repositorie/UserRepository";
import { ApiResponse, Errors, IUser } from "../interface";
import { ServiceSMTP } from "../services/sendinblue/service";
import { BREVO_CONFIG, IAuth } from "../helpers";
import { handlerHttpError, AuthRequest } from "../middlware";
import { ValidateIdType, UserUpdateType } from "../schema";

const User = new UserRepository();
const ServiceEmail = new ServiceSMTP(BREVO_CONFIG.APIKEY);

export class UserController {
  static async getAll(
    req: Request<unknown, unknown, unknown> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IUser[]>>> {
    try {
      const users = await User.getAll();

      const response = {
        status: true,
        total: users.length,
        data: users,
      };

      return res.status(200).json(response);
    } catch (error) {
      return handlerHttpError(res, Errors.ERROR(error).message);
    }
  }

  static async getById(
    req: Request<unknown, unknown, unknown> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IUser>>> {
    const { id } = req.params;

    try {
      const user = await User.getById(id);

      if (!user) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 404);
      }

      const response = {
        status: true,
        data: user,
      };
      return res.status(200).json(response);
    } catch (error) {
      return handlerHttpError(res, Errors.ERROR(error).message);
    }
  }

  static async update(
    req: Request<ValidateIdType, unknown, UserUpdateType> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IUser>>> {
    const { id } = req.params;
    const { first_name, last_name, alias, email, phone } = req.body;

    try {
      const exist = await User.getById(id);

      if (!exist) {
        return handlerHttpError(res, Errors.NOT_FOUND.message, 404);
      }

      const result: IUser = await User.update(id, {
        first_name,
        last_name,
        alias,
        email,
        phone,
      });

      const response: ApiResponse<IUser> = {
        status: true,
        data: result,
      };

      return res.status(202).json(response);
    } catch (error) {
      return handlerHttpError(res, Errors.ERROR(error).message);
    }
  }

  static async delete(
    req: Request<ValidateIdType, unknown, unknown> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IUser>>> {
    try {
      const { id } = req.params;
      const user = await User.update(id, { status: false });
      return res.status(200).json(user);
    } catch (error) {
      return handlerHttpError(res, Errors.ERROR(error).message);
    }
  }

  static async erased(
    req: Request<ValidateIdType, unknown, unknown> & AuthRequest<IAuth>,
    res: Response,
  ): Promise<Response<ApiResponse<IUser>>> {
    const { id } = req.params;

    try {
      const result = await User.delete(id);

      if (result) {
        try {
          await ServiceEmail.DeleteContact({ email: result.email });
        } catch (error) {
          console.error(error);
        }
        return res.status(200).json({ status: true, message: "deleted!" });
      }
      return null;
    } catch (error) {
      return handlerHttpError(res, Errors.ERROR(error).message);
    }
  }
}
