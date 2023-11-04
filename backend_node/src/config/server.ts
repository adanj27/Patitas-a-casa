import express, { Application } from "express";
import cors from "cors";
import { router as formRoutes } from "../routes/forms.routes";

import { connectionDB } from "./database";

class Server {
  private app: Application;

  private port: string;

  private apiPaths = {
    formularios: "/api/formulario",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    // Metodos iniciales
    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  // eslint-disable-next-line class-methods-use-this
  async dbConnection() {
    try {
      await connectionDB();
      console.log("Database online");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura del body
    this.app.use(express.json());

    // Carpeta publica
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.formularios, formRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server corriendo en puerto!! ${this.port}`);
    });
  }
}

export { Server };
