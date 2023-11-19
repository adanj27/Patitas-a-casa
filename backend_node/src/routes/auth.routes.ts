import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { SchemaValidate } from "../middlware/schemaValidator";
import { AuthSchema, DUserSchema, createUserSchema } from "../schema";

const router = Router();

router.post("/login", SchemaValidate(AuthSchema), AuthController.login);
router.post("/logout", AuthController.logout);
router.post(
  "/register",
  SchemaValidate(createUserSchema),
  AuthController.Register,
);
router.post(
  "/:id/reset-password",
  SchemaValidate(DUserSchema),
  AuthController.resetPassword,
);

export { router };
