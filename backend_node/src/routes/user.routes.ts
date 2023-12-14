import { Router } from "express";
import { UserController } from "../controllers";
import { ROL_TYPE } from "../interface";
import { validateIdSchema, UserupdateSchema } from "../schema";
import { SchemaValidate, hasRole, isAuth } from "../middlware";

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
  SchemaValidate(UserupdateSchema),
  UserController.update,
);

router.delete(
  "/:id/logic",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  UserController.delete,
);

router.delete(
  "/:id/destroy",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  UserController.erased,
);
export { router };
