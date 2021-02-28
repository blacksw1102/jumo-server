import fs from "fs";
import path from "path";
import express from "express";
import logger from "morgan";
import passport from "passport";
import session from "express-session";

import AuthRouter from "./router/Auth";
import SearchRouter from "./router/Search";

export default class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.initAddon();
    this.initRouter();
  }

  private initAddon() {
    this.app.use(logger("dev"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    // session
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: "fadsfadssadf"
      })
    );
    
    // passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initRouter() {
    this.app.use(new AuthRouter().getRouter());
    this.app.use(new SearchRouter().getRouter());
  }
}
