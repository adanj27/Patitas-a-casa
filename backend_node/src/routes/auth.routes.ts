import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/register", AuthController.Register);
router.post("/:id/reset-password", AuthController.resetPassword);

export { router };
