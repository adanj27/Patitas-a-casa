import { Response } from "express";
import { TOKEN } from "./constanst";

export const generateSlug = (data: string): string => {
  return data
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const setAccessTokenCookie = (res: Response, token: string) => {
  res.cookie(TOKEN.NAME, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // Tiempo de vida de la cookie (en milisegundos)
    sameSite: "strict", // Restringir la cookie a solicitudes del mismo sitio
  });
};
