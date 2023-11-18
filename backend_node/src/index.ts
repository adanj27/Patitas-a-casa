import { app } from "./config/app";
import { connectionDB } from "./config/database";
import { Server } from "./config/server";
import { APP_CONFIG } from "./helpers";

connectionDB();
const server = new Server({ config: APP_CONFIG }, app);

server.start();

/* const itemData = [
  {
    name: "first item",
    alias: "puppy",
    image:
      "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
    description: "hola mi nombrees puppy",
  },
  {
    name: "two item",
    alias: "black",
    image:
      "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
    description: "hola mi nombrees puppy",
  },
  {
    name: "tree item",
    alias: "cat",
    image:
      "https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg",
    description: "hola mi nombrees puppy",
  },
];
const params = {
  name: " sectorizando mensajes",
  message: "encuentra",
  items: itemData,
};
const serviceEmail = new ServiceSMTP(BREVO_CONFIG.APIKEY);
/* 
serviceEmail
  .SendEmail({ type: "pets", items: params })
  .then((result) => {
    console.log({ index: result }); // Esto debería mostrar el resultado de AddContact
  })
  .catch((error) => {
    console.error(error);
  });
 */
/*
serviceEmail
  .getTemplate({ type: "PETS" })
  .then((result) => {
    console.log({ index: result }); // Esto debería mostrar el resultado de AddContact
  })
  .catch((error) => {
    console.error(error);
  });
 */
