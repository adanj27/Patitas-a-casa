import { Router } from "express";

import { formGet, formPost, formsGet } from "../controllers/formsController";

const router = Router();

router.get("/", formsGet);

router.get("/:id", formGet);

router.post("/", formPost);

export { router };
