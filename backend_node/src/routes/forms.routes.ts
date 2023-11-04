import { Router } from "express";

import {
  getForm,
  getForms,
  postForm,
  // putForm,
  // deleteForm,
} from "../controllers/forms.controller";

const router = Router();

router.get("/", getForms);

router.get("/:id", getForm);

router.post("/", postForm);

// router.put("/:id", putForm);

// router.delete("/:id", deleteForm);

export { router };
