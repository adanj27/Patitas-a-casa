import { Router } from "express";

import { SchemaValidate } from "../middlware/schemaValidator";
import { FormController } from "../controllers";
import { isAuth } from "../middlware/authorization";
import { ROL_TYPE } from "../interface";
import { checkrol } from "../middlware/checkroles";
import { DFormSchema, FormSchema, UFormSchema } from "../schema";

const router = Router();

router.get("/", FormController.getAll);

router.get("/:id", FormController.getById);

router.post("/", isAuth, SchemaValidate(FormSchema), FormController.create);

router.patch(
  "/:id",
  isAuth,
  SchemaValidate(UFormSchema),
  FormController.update,
);

router.delete(
  "/:id",
  isAuth,
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DFormSchema),
  FormController.delete,
);

export { router };
