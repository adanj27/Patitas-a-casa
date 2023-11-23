import { Router } from "express";

import { UserController } from "../controllers";
import { isAuth } from "../middlware/authorization";
import { checkrol } from "../middlware/checkroles";
import { ROL_TYPE } from "../interface";
import { SchemaValidate } from "../middlware/schemaValidator";
import { DUserSchema, UUserSchema } from "../schema";

const router = Router();

router.get(
  "/",
  isAuth,
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin]),
  UserController.getAll,
);

router.get(
  "/:id",
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin]),
  isAuth,
  UserController.getById,
);

router.patch(
  "/:id",
  isAuth,
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor, ROL_TYPE.user]),
  SchemaValidate(UUserSchema),
  UserController.update,
);

router.delete(
  "/:id",
  isAuth,
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DUserSchema),
  UserController.delete,
);

export { router };
