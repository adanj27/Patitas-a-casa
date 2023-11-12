import { app } from "./config/app";
import { connectionDB } from "./config/database";
import { Server } from "./config/server";
import { APP_CONFIG, BREVO_CONFIG } from "./helpers";
import { ServiceSMTP } from "./services/sendinblue/service";

connectionDB();
const server = new Server({ config: APP_CONFIG }, app);

server.start();

const serviceEmail = new ServiceSMTP(BREVO_CONFIG.APIKEY);

serviceEmail
  .SendEmail()
  .then((result) => {
    console.log({ index: result }); // Esto debería mostrar el resultado de AddContact
  })
  .catch((error) => {
    console.error(error);
  });
