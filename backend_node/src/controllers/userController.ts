import { Request, Response } from "express";
import bcryptjs from "bcrypt";
import { UserModel as User } from "../models/mongoose/user.model";
import { Errors } from "../interface";

export class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const { limit = 5, from = 0 } = req.query;
      const query = { status: true };

      const users = await User.find(query)
        .skip(Number(from))
        .limit(Number(limit));

      const response = {
        status: true,
        total: users.length,
        data: users,
      };

      return res.json(response);
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await User.findById(id);

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

  static async create(req: Request, res: Response) {
    try {
      const { user_name, email, token, password, roles } = req.body;
      const user = new User({ user_name, email, token, password, roles });

      // encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      user.password = bcryptjs.hashSync(password, salt);

      // Guardar en BD
      await user.save();

      return res.json({ user });
    } catch (error) {
      return res.status(500).json(Errors.ERROR_DATABASE(error));
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, password, ...rest } = req.body;

    // TODO: validar contra base de datos
    if (password) {
      // encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, { new: true });

    res.json(user);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json(user);
  }
}
