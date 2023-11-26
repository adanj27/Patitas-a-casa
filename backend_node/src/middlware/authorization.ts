import { NextFunction, Request, Response } from "express";
import { IAuth, JWT } from "../helpers";
import { UserRepository } from "../models/repositorie";
import { handlerHttpError } from "./handlerHttpError";

export interface AuthRequest<T = unknown> extends Request {
  user?: T;
}

const User = new UserRepository();

export const isAuth = async (
  req: AuthRequest<IAuth>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) {
      return handlerHttpError(res, "Dont have credentials valid!", 404);
    }

    const token = req.headers.authorization.split(" ").pop();

    if (!token) {
      return handlerHttpError(res, "Dont have credentials valid!", 404);
    }

    const verified = await JWT.verify(token);

    const validUser = await User.getById(verified.id);
    const { _id } = validUser.rol;

    const AuthUser = {
      id: validUser._id,
      alias: validUser.alias,
      rol: _id,
    };

    req.user = AuthUser;

    next();
  } catch (error) {
    return handlerHttpError(res);
  }

  return undefined;
};
