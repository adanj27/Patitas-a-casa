import { Router } from "express";

import { SchemaValidate } from "../middlware/schemaValidator";
import { FormSchema } from "../schema/formSchema";
import { FormController } from "../controllers";

const router = Router();

router.get("/", FormController.getAll);

router.post("/", SchemaValidate(FormSchema), FormController.create);

router.get("/:id", FormController.getById);

export { router };
