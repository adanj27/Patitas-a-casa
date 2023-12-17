import { Router } from "express";
import { FormController } from "../controllers";
import { ROL_TYPE } from "../interface";
import {
  validateIdSchema,
  FormFoundPetSchema,
  FormLostPetSchema,
  FormUpdateSchema,
} from "../schema";
import { SchemaValidate, hasRole, isAuth } from "../middlware";

const router = Router();

router.get("/", FormController.getAll);

router.get("/:id", FormController.getById);

router.post(
  "/found",
  isAuth,
  hasRole([ROL_TYPE.user, ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(FormFoundPetSchema),
  FormController.createFound,
);

router.post(
  "/lost",
  isAuth,
  hasRole([ROL_TYPE.user, ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(FormLostPetSchema),
  FormController.createLost,
);

router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.admin, ROL_TYPE.editor, ROL_TYPE.user]),
  SchemaValidate(FormUpdateSchema),
  FormController.update,
);

router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  FormController.delete,
);

export { router };
