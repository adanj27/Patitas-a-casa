import { NextFunction, Response } from "express";
import { RolRepository, UserRepository } from "../models/repositorie";
import { AuthRequest } from "./authorization";
import { IAuth } from "../helpers";
import { handlerHttpError } from "./handlerHttpError";
import { Errors } from "../interface";

const User = new UserRepository();
const Rol = new RolRepository();
export const hasRole =
  (roles) =>
  async (req: AuthRequest<IAuth>, res: Response, next: NextFunction) => {
    let hasRol;
    try {
      const { user } = req;

      const validUser = await User.getById(user.id);

      if (validUser && validUser.rol) {
        const rolId = String(validUser.rol);
        hasRol = await Rol.getById(rolId);
      }
      const checkValueRol = roles.some((rol) =>
        rol.toLowerCase().includes(hasRol.name.toLowerCase()),
      );

      if (!checkValueRol) {
        return handlerHttpError(res, Errors.UNAUTHORIZED.message, 403);
      }

      next();
    } catch (error) {
      return handlerHttpError(res, `${error}`);
    }
    return undefined;
  };
