import { Router } from "express";

import { SchemaValidate } from "../middlware/schemaValidator";
import { UserController } from "../controllers";
import { DUserSchema, UUserSchema, UserSchema } from "../schema";

const router = Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

router.post("/", SchemaValidate(UserSchema), UserController.create);

router.put("/:id", SchemaValidate(UUserSchema), UserController.update);

router.delete("/:id", SchemaValidate(DUserSchema), UserController.delete);

export { router };
