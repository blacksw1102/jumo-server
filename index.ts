import Server from "./lib/Server";
import Config from "./lib/Config";
import DB from "./lib/DB";
import Passport from "./lib/Passport";
import passport from "passport";

async function main() {
  await Config.load();
  await DB.createPool();
  new Passport(passport);

  const app = new Server().app;

  let serverPort = Config.getInstance().server.port;

  app.listen(serverPort, () => {
    console.log("Server Start");
    console.log(`Port : ${serverPort}`);

    if(process.env.EXIT_ON_SUCCESS) {
      console.log("Server Stop");
      process.exit();
    }
  });
}

main();


