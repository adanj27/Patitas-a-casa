import { app } from "./config/app";
import { connectionDB } from "./config/database";
import { Server } from "./config/server";
import { APP_CONFIG } from "./helpers";
import { createRoles, createSuperAdmin } from "./models/seed/initialSeed";

connectionDB();

// Seed
createRoles();
setTimeout(async () => {
  createSuperAdmin();
}, 5000);

const server = new Server({ config: APP_CONFIG }, app);
server.start();
