import { app } from "./config/app";
import { connectionDB } from "./config/database";
import { Server } from "./config/server";
import { APP_CONFIG } from "./helpers";
import { createRoles, createSuperAdmin } from "./models/seed/initialSeed";
import { htmlContent } from "./services/sendinblue/template";
import { MailInterface, MailService } from "./services/mailService";

connectionDB();

// Seed
createRoles();
setTimeout(async () => {
  createSuperAdmin();
}, 5000);

const server = new Server({ config: APP_CONFIG }, app);
server.start();

const mailService = MailService.getInstance();

// Crear la conexión antes de enviar el correo
mailService
  .createConnection(false)
  .then(() => {
    const mailOptions: MailInterface = {
      from: process.env.SMTP_SENDER,
      to: "phew_misame@example.com",
      subject: "Asunto del correo",
      text: "Este es el cuerpo del mensaje en formato texto",
      html: htmlContent,
    };

    return mailService.sendMail("ID_de_la_solicitud", mailOptions);
  })
  .then((info) => {
    console.log("Correo enviado:", info);
    // Haz algo con la información devuelta si es necesario
  })
  .catch((error) => {
    console.error("Error al enviar el correo:", error);
    // Manejar errores si es necesario
  });
