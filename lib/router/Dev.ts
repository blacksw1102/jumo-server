import express from "express";

export default class AuthRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    /* 로그인 영역 */
    this.Router.get("/quit", (req, res) => {
      res.end("Server Closed");
      process.exit();
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
