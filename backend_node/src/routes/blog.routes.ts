import { Router } from "express";
import { BlogController } from "../controllers/blogController";
import { SchemaValidate } from "../middlware/schemaValidator";
import { BlogSchemaz, DBlogSchema, UBlogSchema } from "../schema";

const router = Router();

router.get("/", BlogController.getAll);
router.post("/", SchemaValidate(BlogSchemaz), BlogController.create);
router.get("/:id", BlogController.getById);
router.patch("/:id", SchemaValidate(UBlogSchema), BlogController.update);
router.delete("/:id", SchemaValidate(DBlogSchema), BlogController.delete);

export { router };
