import { NextFunction, Request, Response } from "express";
import { IAuth, JWT } from "../helpers";
import { UserRepository } from "../models/repositorie";

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
      return res.status(404).json({ message: "Dont have credentials" });
    }

    const token = req.headers.authorization.split(" ").pop();

    if (!token) {
      return res.status(404).json({ message: "Dont have credentials" });
    }

    const verified = await JWT.verify(token);

    const foundUser = await User.getByOne({ _id: verified.id });
    const { _id } = foundUser.rol;

    const AuthUser = {
      id: foundUser._id,
      alias: foundUser.alias,
      rol: _id,
    };

    req.user = AuthUser;

    next();
  } catch (error) {
    return res.status(401).json({ message: "error en authorization" });
  }

  return undefined;
};
