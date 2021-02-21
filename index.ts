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

  app.listen(8080, () => {
    console.log("Server Start");
  });
}

main();


