//import cors from "cors";


/**
 *  *The code snippet is defining a middleware function called `corsMiddleware` *   that handles Cross-Origin Resource Sharing (CORS) for an
 *   Express.js application.
 * !TODO: You can add future destiny routes here.
 */

const ACCEPTED_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"];
const cors= require('cors');

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (acceptedOrigins.includes(origin) || process.env.APP_DESTINY) {
        return callback(null, true);
      }
      console.log (origin)
      return callback(new Error("Not allowed by CORS"));
    },
    allowedHeaders:
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Origin, Access-Control-Allow-Headers",
      methods: "GET, POST, OPTIONS, PUT, DELETE, PATCH",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true, // Habilitar el envío de cookies
  });
