/* eslint-disable no-underscore-dangle */
import express, { Router, Express } from "express";
import http from "node:http";

import { serverConfig } from "../interface/config";

class Server {
  private _config: serverConfig;

  private _express: Express;

  private _server: http.Server;

  private _router: Router;

  constructor({ config }: { config: serverConfig }, router: Router) {
    this._config = config;
    this._express = express();
    this._server = http.createServer(this._express);
    this._router = router;
    this._express.use(router);
  }

  public start() {
    return new Promise<void>((resolve, reject): void => {
      this._server.on("error", (error) => {
        reject(error);
      });

      this._server.listen(this._config.PORT || process.env.PORT, () => {
        console.log(`✓ Project ${this._config.NAME}`);
        console.log(`✓ Service: ${this._config.ENV}`);
        if (this._config.ENV !== "production") {
          console.log(
            `✓ Server running on ${this._config.HOST}:${this._config.PORT}`,
          );
        }
        resolve();
      });
    });
  }

  public stop() {
    return new Promise<void>((resolve, reject) => {
      this._server.close((error) => {
        if (error) {
          reject(error);
        } else {
          console.log("✓ Server stopped");
          resolve();
        }
      });
    });
  }
}

export { Server };
