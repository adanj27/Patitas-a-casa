import { Router } from "express";

import { UserController } from "../controllers";

const router = Router();

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

router.post("/", UserController.create);

router.put("/:id", UserController.update);

router.delete("/:id", UserController.delete);

export { router };
