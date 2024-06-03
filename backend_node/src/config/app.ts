import express from "express";
import swaggerUI from "swagger-ui-express";
import { apiRoute } from "../v1/routes";
import { APP_CONFIG } from "../helpers";
import { swaggerSetup } from "../dosc/swagger";
import { corsMiddleware } from "./corsOptions";

const app = express();
app.use(corsMiddleware());        

app.disable("X-Powered-By");
app.use(express.json());

// endpoint test for production
app.get("/", (req, res) => {
  return res.json({       
    message: `welcome to res-api to project ${APP_CONFIG.NAME}`,
  });
});

app.use(apiRoute);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSetup));

export { app };
