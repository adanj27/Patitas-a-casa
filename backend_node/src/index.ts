import { app } from "./config/app";
import { connectionDB } from "./config/database";
import { Server } from "./config/server";
import { APP_CONFIG } from "./helpers";

connectionDB();
const server = new Server({ config: APP_CONFIG }, app);

server.start();
