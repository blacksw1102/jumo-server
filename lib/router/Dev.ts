import express from "express";
import passport from "passport";

export default class AuthRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    /* 로그인 영역 */
    this.Router.get("/quit", (req, res) => {
      res.end("Server Closed");
      process.exit();
    });

    /* 테스트 요청 */
    this.Router.post("/test", passport.authenticate("jwt", { session: false }), (req, res) => {
      res.status(200).json({ data: "Test", id: req.user });
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
