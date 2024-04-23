import { Router } from "express";
import { DShelterSchema, ShelterSchemaz, UShelterSchema } from "../../schema";
import { ShelterController } from "../../controllers/shelterController";
import { SchemaValidate, hasRole, isAuth } from "../../middlware";
import { ROL_TYPE } from "../../interface";

const router = Router();

router.get("/", ShelterController.getAll);
router.post(
  "/",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(ShelterSchemaz),
  ShelterController.create,
);

router.get("/:id", SchemaValidate(DShelterSchema), ShelterController.getById);

router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(UShelterSchema),
  ShelterController.update,
);

router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DShelterSchema),
  ShelterController.delete,
);

export { router };
