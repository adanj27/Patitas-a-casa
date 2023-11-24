import { Router } from "express";
import { SchemaValidate } from "../middlware/schemaValidator";
import { isAuth } from "../middlware/authorization";
import { checkrol } from "../middlware/checkroles";
import { ROL_TYPE } from "../interface/props/RolInterface";
import { DShelterSchema, ShelterSchemaz, UShelterSchema } from "../schema";
import { ShelterController } from "../controllers/shelterController";

const router = Router();

router.get("/", ShelterController.getAll);
router.post(
  "/",
  isAuth,
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(ShelterSchemaz),
  ShelterController.create,
);

router.get("/:id", SchemaValidate(DShelterSchema), ShelterController.getById);

router.patch(
  "/:id",
  isAuth,
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(UShelterSchema),
  ShelterController.update,
);

router.delete(
  "/:id",
  isAuth,
  checkrol([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DShelterSchema),
  ShelterController.delete,
);

export { router };
