import { Router } from "express";

import { SchemaValidate } from "../middlware/schemaValidator";
import { PetSchema } from "../schema/petSchema";
import { PetController } from "../controllers";

const router = Router();

router.get("/", PetController.getAll);

router.post("/", SchemaValidate(PetSchema), PetController.create);

router.get("/:id", PetController.getById);

export { router };
