import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { Errors } from "../interface";

export const SchemaValidate =
  (schema: AnyZodObject) =>
  // eslint-disable-next-line consistent-return
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(404).json({ message: error.issues });
      }

      return res.status(400).json(Errors.ERROR_DATABASE(error));
    }
  };
