import express from "express";
import logger from "morgan";
import passport from "passport";
import flash from "connect-flash";

import AuthRouter from "./router/Auth";
import SearchRouter from "./router/Search";
import DevRouter from "./router/Dev";
import RestaurantRouter from "./router/Restaurant";

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initAddon();
    this.initRouter();
  }

  private initAddon() {
    this.app.use(logger("common"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());

    // passport
    this.app.use(flash());
    this.app.use(passport.initialize());
  }

  private initRouter() {
    this.app.use(new AuthRouter().getRouter());
    this.app.use("/search", new SearchRouter().getRouter());
    this.app.use("/restaurant", new RestaurantRouter().getRouter());
    this.app.use(new DevRouter().getRouter());
  }
}
