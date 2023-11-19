import { Request, Response } from "express";

export class AuthController {
  static async Register(req: Request, res: Response) {
    return res.send("register");
  }

  static async login(req: Request, res: Response) {
    return res.send("login");
  }

  static async logout(req: Request, res: Response) {
    return res.send("disconnect");
  }

  static async resetPassword(req: Request, res: Response) {
    return res.send("pass");
  }
}
