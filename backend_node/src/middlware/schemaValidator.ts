import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { handlerHttpError } from "./handlerHttpError";

export const SchemaValidate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.issues });
      }

      return handlerHttpError(res);
    }
    return undefined;
  };
