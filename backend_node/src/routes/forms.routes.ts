import { Router } from "express";

import { formGet, formPost, formsGet } from "../controllers/forms.controller";

const router = Router();

router.get("/", formsGet);

router.get("/:id", formGet);

router.post("/", formPost);

export { router };
