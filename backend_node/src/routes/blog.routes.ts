import { Router } from "express";
import { BlogController } from "../controllers/blogController";
import {
  BlogcreateSchema,
  BlogupdateSchema,
  validateIdSchema,
} from "../schema";
import { ROL_TYPE } from "../interface/props/RolInterface";
import { SchemaValidate, hasRole, isAuth } from "../middlware";

const router = Router();

router.get("/", BlogController.getAll);
router.post(
  "/",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(BlogcreateSchema),
  BlogController.create,
);

router.get("/:id", SchemaValidate(validateIdSchema), BlogController.getById);

router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(BlogupdateSchema),
  BlogController.update,
);

router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(validateIdSchema),
  BlogController.delete,
);

export { router };
