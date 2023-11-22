import { Request, Response } from "express";
import { UserRepository } from "../models/repositorie/UserRepository";
import { Errors } from "../interface";

const User = new UserRepository();
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

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.update(id, { status: false });
    return res.status(200).json(user);
  }
}
