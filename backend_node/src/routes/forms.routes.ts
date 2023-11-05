import { Router } from "express";

import { FormController } from "../controllers/formsController";
import { BlogController } from "../controllers";
import { SchemaValidate } from "../middlware/schemaValidator";
import { FormSchema } from "../schema/formSchema";

const router = Router();

router.get("/", BlogController.getAll);

router.post("/", SchemaValidate(FormSchema), FormController.create);

router.get("/:id", FormController.getById);

export { router };
