import { NextFunction, Response } from "express";
import { RolRepository, UserRepository } from "../models/repositorie";
import { AuthRequest } from "./authorization";
import { IAuth } from "../helpers";

const User = new UserRepository();
const Rol = new RolRepository();
export const checkrol =
  (roles: string[]) =>
  async (req: AuthRequest<IAuth>, res: Response, next: NextFunction) => {
    let byRol;
    try {
      const { user } = req;

      const validUser = await User.getById(user.id);

      if (validUser && validUser.rol) {
        const rolId = String(validUser.rol);
        byRol = await Rol.getById(rolId);
      }
      const checkValueRol = roles.some((rol) =>
        rol.toLowerCase().includes(byRol.name.toLowerCase()),
      );

      if (!checkValueRol) {
        return res.status(403).json({ message: "Dont have credentials" });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: "no valid" });
    }
    return undefined;
  };
