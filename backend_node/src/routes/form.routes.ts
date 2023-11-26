import { Router } from "express";

import { SchemaValidate } from "../middlware/schemaValidator";
import { FormController } from "../controllers";
import { isAuth } from "../middlware/authorization";
import { ROL_TYPE } from "../interface";
import { hasRole } from "../middlware/checkroles";
import {
  DFormSchema,
  FormFoundSchema,
  FormLostSchema,
  UFormSchema,
} from "../schema";

const router = Router();

router.get("/", FormController.getAll);

router.get("/:id", FormController.getById);

router.post(
  "/found",
  isAuth,
  hasRole([ROL_TYPE.user]),
  SchemaValidate(FormFoundSchema),
  FormController.createFound,
);

router.post(
  "/lost",
  isAuth,
  hasRole([ROL_TYPE.user]),
  SchemaValidate(FormLostSchema),
  FormController.createLost,
);

router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.admin, ROL_TYPE.editor, ROL_TYPE.user]),
  SchemaValidate(UFormSchema),
  FormController.update,
);

router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DFormSchema),
  FormController.delete,
);

export { router };
