import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { AuthResetPassSchema, AuthSchema, UsercreateChema } from "../schema";
import { SchemaValidate, isAuth } from "../middlware";

const router = Router();

router.post("/login", SchemaValidate(AuthSchema), AuthController.login);
router.post("/logout", isAuth, AuthController.logout);
router.post(
  "/register",
  SchemaValidate(UsercreateChema),
  AuthController.Register,
);
router.post(
  "/:id/reset-password",
  isAuth,
  SchemaValidate(AuthResetPassSchema),
  AuthController.resetPassword,
);

export { router };
