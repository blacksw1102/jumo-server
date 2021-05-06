import Server from "./lib/Server";
import Config from "./lib/Config";
import DB from "./lib/DB";
import Passport from "./lib/Passport";
import passport from "passport";
import logger from "./lib/logger";

import User from "./lib/User";

async function main() {
  await Config.load();
  await DB.createPool();
  new Passport(passport);

  const app = new Server().app;

  let serverPort = Config.getInstance().server.port;

  app.listen(serverPort, () => {
    logger.info("Server Start");
    logger.info(`Port : ${serverPort}`);

    if (process.env.EXIT_ON_SUCCESS) {
      logger.info("Server Stop");
      process.exit();
    }
  });
}

main();


