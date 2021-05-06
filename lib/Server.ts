import express from "express";
import morgan, {Options as MorganOptions} from "morgan";
import passport from "passport";
import flash from "connect-flash";
import moment from "moment-timezone";
import logger, { webLogStream } from "./logger";

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
    const morganOption: MorganOptions<express.Request, express.Response> = {
      stream: webLogStream
    };
    this.app.use(
      morgan(
        ":method :url :status :res[content-length] - :response-time ms\\",
        morganOption
      )
    );
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
