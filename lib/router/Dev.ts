import express from "express";
import passport from "passport";
import fs from "fs";
import logger from "../logger";

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

    /* 웹 로그 */
    this.Router.get("/log", (req, res) => {
      fs.readFile("~/.pm2/logs/index-out.log", (err, data) => {
        if(err) {
          logger.error(err);
        }
        res.status(200).send(data);
      });
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
