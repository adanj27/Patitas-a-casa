import { Router } from "express";

import { UserController } from "../controllers";
import { isAuth } from "../middlware/authorization";
import { hasRole } from "../middlware/checkroles";
import { ROL_TYPE } from "../interface";
import { SchemaValidate } from "../middlware/schemaValidator";
import { DUserSchema, UUserSchema } from "../schema";

const router = Router();

router.get(
  "/",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  UserController.getAll,
);

router.get(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  UserController.getById,
);

router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor, ROL_TYPE.user]),
  SchemaValidate(UUserSchema),
  UserController.update,
);

router.delete(
  "/:id/logic",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DUserSchema),
  UserController.delete,
);

router.delete(
  "/:id/destroy",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DUserSchema),
  UserController.erased,
);
export { router };
