import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { SchemaValidate } from "../middlware/schemaValidator";
import { AuthResetPassSchema, AuthSchema, createUserSchema } from "../schema";
import { isAuth } from "../middlware/authorization";

const router = Router();

router.post("/login", SchemaValidate(AuthSchema), AuthController.login);
router.post("/logout", isAuth, AuthController.logout);
router.post(
  "/register",
  SchemaValidate(createUserSchema),
  AuthController.Register,
);
router.post(
  "/:id/reset-password",
  isAuth,
  SchemaValidate(AuthResetPassSchema),
  AuthController.resetPassword,
);

export { router };
