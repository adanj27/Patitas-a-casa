import { Router } from "express";

import { UserController } from "../controllers";
import { isAuth } from "../middlware/authorization";
import { checkrol } from "../middlware/checkroles";
import { ROL_TYPE } from "../interface";
import { SchemaValidate } from "../middlware/schemaValidator";
import { DUserSchema, UUserSchema } from "../schema";

const router = Router();

router.get("/", isAuth, UserController.getAll);

router.get("/:id", isAuth, UserController.getById);

router.patch(
  "/:id",
  isAuth,
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
