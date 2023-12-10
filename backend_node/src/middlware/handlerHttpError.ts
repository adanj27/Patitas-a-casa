import { Response } from "express";

export const handlerHttpError = (
  res: Response,
  message = "PROCESO_NO_ESPERADO",
  code = 500,
) => {
  console.log(message);
  return res.status(code).json({ status: false, error: message });
};
