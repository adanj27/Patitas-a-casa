import { Router } from "express";
import fs from "fs";

const pathRoute = `${__dirname}`;
const apiRoute = Router();

const removeExtends = (filename: string) => {
  return filename.split(".").shift();
};

fs.readdirSync(pathRoute).forEach((filename) => {
  const routefile = removeExtends(filename);
  if (routefile !== "index") {
    import(`./${routefile}.routes`).then((moduleRouter) => {
      apiRoute.use(`/api/v1/${routefile}`, moduleRouter.router);
    });
  }
});

export { apiRoute };
