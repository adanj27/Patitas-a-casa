import express from "express";
import cors from "cors";
import { apiRoute } from "../routes";
import { APP_CONFIG } from "../helpers";

const app = express();

app.disable("X-Powered-By");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json({
    message: `welcome to res-api to project ${APP_CONFIG.NAME}`,
  });
});

app.use("/api", apiRoute);

export { app };
