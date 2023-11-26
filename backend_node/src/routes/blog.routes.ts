import { Router } from "express";
import { BlogController } from "../controllers/blogController";
import { SchemaValidate } from "../middlware/schemaValidator";
import { BlogSchemaz, DBlogSchema, UBlogSchema } from "../schema";
import { isAuth } from "../middlware/authorization";
import { hasRole } from "../middlware/checkroles";
import { ROL_TYPE } from "../interface/props/RolInterface";

const router = Router();

router.get("/", BlogController.getAll);
router.post(
  "/",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(BlogSchemaz),
  BlogController.create,
);

router.get("/:id", SchemaValidate(DBlogSchema), BlogController.getById);

router.patch(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin, ROL_TYPE.editor]),
  SchemaValidate(UBlogSchema),
  BlogController.update,
);

router.delete(
  "/:id",
  isAuth,
  hasRole([ROL_TYPE.ghost, ROL_TYPE.admin]),
  SchemaValidate(DBlogSchema),
  BlogController.delete,
);

export { router };
