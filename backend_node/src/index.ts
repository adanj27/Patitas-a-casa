// import express from "express";
// import { connectionDB } from "./config/database";
// import { apiRoute } from "./routes";
import { Server } from "./config/server";

const server = new Server();

server.listen();

// connectionDB();

// const app = express();

// app.disable("x-powered-by");
// app.use(express.json());

// app.get("/", (req, res) => {
//   return res.json({ message: "welcome api" });
// });

// app.use("/api", apiRoute);

// app.listen(4000, () => {
//   console.log("✓ Server running on localhost:4000");
// });
