import express from "express";
import logger from "morgan";
import passport from "passport";
import * as mysqlSession from 'express-mysql-session';
import * as session from 'express-session';
import config from "./Config";
import flash from "connect-flash";

import AuthRouter from "./router/Auth";
import SearchRouter from "./router/Search";
import DevRouter from "./router/Dev";

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

    // session-store
    const MySQLStore = mysqlSession.default(session);

    // session
    this.app.use(
      session.default({
        resave: false,
        saveUninitialized: false,
        secret: "fadsfadssadf",
        store: new MySQLStore(config.getInstance().db)
      })
    );

    // passport
    this.app.use(flash());
    this.app.use(passport.initialize());
    // this.app.use(passport.session());
  }

  private initRouter() {
    this.app.use(new AuthRouter().getRouter());
    this.app.use(new SearchRouter().getRouter());
    this.app.use(new DevRouter().getRouter());
  }
}
