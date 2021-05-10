import express from "express";
import passport from "passport";

import AuthController from "../controller/AuthController";

export default class AuthRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    /* 로그인 */
    this.Router.post("/signin", AuthController.signin);
    /* AccessToken 재발급 */
    this.Router.post("/refresh", AuthController.refreshToken);
    /* 로그인 요청 */
    this.Router.post("/auth", AuthController.auth);
    /* 회원가입 요청 */
    this.Router.post("/signup_process", AuthController.signupProcess);
    /* 로그아웃 */
    this.Router.get("/logout", AuthController.logout);
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}