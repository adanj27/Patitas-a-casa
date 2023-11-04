import express from "express";
import { connectionDB } from "./config/database";
import { apiRoute } from "./routes";

connectionDB();

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "welcome api" });
});

app.use("/api", apiRoute);

app.listen(4000, () => {
  console.log("✓ Server running on localhost:4000");
});
