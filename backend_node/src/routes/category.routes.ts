import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send({ message: "get all category" });
});

export { router };