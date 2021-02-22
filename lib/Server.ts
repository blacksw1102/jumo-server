import fs from "fs";
import path from "path";
import express from "express";
import logger from "morgan";
import AuthRouter from "./router/Auth";
import passport from "passport";
import * as mysqlSession from 'express-mysql-session';
import * as session from 'express-session';
import config from "./Config";

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
    const MySQLStore   = mysqlSession.default(session);

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
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initRouter() {
    this.app.use(new AuthRouter().getRouter());
  }
}
