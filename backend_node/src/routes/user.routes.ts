import { Router } from "express";

import { SchemaValidate } from "../middlware/schemaValidator";
import { UserSchema } from "../schema/userSchema";
import { UserController } from "../controllers";

const router = Router();

router.get("/", UserController.getAll);

router.post("/", SchemaValidate(UserSchema), UserController.create);

router.get("/:id", UserController.getById);

export { router };
