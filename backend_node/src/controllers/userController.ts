import { Request, Response } from "express";
import { UserRepository } from "../models/repositorie/UserRepository";
import { ApiResponse, Errors, IUser } from "../interface";
import { ServiceSMTP } from "../services/sendinblue/service";
import { BREVO_CONFIG } from "../helpers";

const User = new UserRepository();
const ServiceEmail = new ServiceSMTP(BREVO_CONFIG.APIKEY);

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await User.getAll();

      const response = {
        status: true,
        total: users.length,
        data: users,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await User.getById(id);

      if (!user) {
        return res.status(404).json(Errors.NOT_FOUND);
      }

      const response = {
        status: true,
        data: user,
      };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
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
        return res.status(404).json(Errors.NOT_FOUND);
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
      return res.status(500).json(Errors.ERROR_DATABASE(error.message));
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.update(id, { status: false });
    await ServiceEmail.DeleteContact({ email: user.email });
    return res.status(200).json(user);
  }
}
