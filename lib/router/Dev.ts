import express from "express";
import passport from "passport";

import DevController from "../controller/DevController";

export default class AuthRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    /* 로그인 영역 */
    this.Router.get("/quit", DevController.quitServer);

    /* 테스트 요청 */
    this.Router.post("/test", passport.authenticate("jwt", { session: false }), DevController.testJWT);

    /* 웹 로그 */
    this.Router.get("/log", DevController.getLog);
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
