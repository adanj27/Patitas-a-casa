import { Router } from "express";

import { UserController } from "../controllers";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.delete);

export { router };
