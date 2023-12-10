import { Response } from "express";

export const handlerHttpError = (
  res: Response,
  message = "PROCESO_NO_ESPERADO",
  code = 500,
) => {
  return res.status(code).json({ status: false, error: message });
};
