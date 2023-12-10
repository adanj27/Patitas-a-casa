import { Request, Response } from "express";
import { UserRepository } from "../models/repositorie/UserRepository";
import { ApiResponse, Errors, IUser } from "../interface";
import { handlerHttpError } from "../middlware/handlerHttpError";
import { DUserType } from "../schema";

const User = new UserRepository();
export class UserController {
  static async getAll(
    req: Request,
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
      return handlerHttpError(res, Errors.ERROR_DATABASE(error).message);
    }
  }

  /*   static async addUserByAuth(req: request, res: Response) {
    const {} = req.body;
  }
 */
  static async getById(
    req: Request,
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
      return handlerHttpError(res, Errors.ERROR_DATABASE(error).message);
    }
  }

  static async update(
    req: Request,
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
      return handlerHttpError(res, Errors.ERROR_DATABASE(error).message);
    }
  }

  static async delete(
    req: Request,
    res: Response,
  ): Promise<Response<ApiResponse<IUser>>> {
    try {
      const { id } = req.params;
      const user = await User.update(id, { status: false });
      return res.status(200).json(user);
    } catch (error) {
      return handlerHttpError(res, Errors.ERROR_DATABASE(error).message);
    }
  }

  static async erased(
    req: Request<DUserType, unknown, unknown>,
    res: Response,
  ): Promise<Response<ApiResponse<IUser>>> {
    const { id } = req.params;

    try {
      const result = await User.delete(id);

      if (result)
        return res.status(200).json({ status: true, message: "deleted!" });
      return null;
    } catch (error) {
      return handlerHttpError(res);
    }
  }
}
