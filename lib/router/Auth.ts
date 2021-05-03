import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import Config from "../Config";

export default class AuthRouter {
    private Router: express.Router;

    constructor() {
      this.Router = express.Router();

      /* 로그인 영역 */
      this.Router.get("/", (req, res) => {
        res.end("/");
      });

      /**
       * 로그인
       */
      this.Router.post("/signin", (req, res, next) => {
        passport.authenticate("local", { session: false }, (err, user) => {
          if (err || !user) {
            return res.status(400).end();
          }

          req.login(user, { session: false }, (err) => {
            if (err) {
              next(err);
            }
            const accessToken = jwt.sign(
              { id: user },
              Config.getInstance().server.jwtAccessTokenSecret,
              { expiresIn: Config.getInstance().server.jwtAccessTokenExpire }
            );
            const refreshToken = jwt.sign(
              { id: user },
              Config.getInstance().server.jwtRefreshTokenSecret,
              { expiresIn: Config.getInstance().server.jwtRefreshTokenExpire }
            );
            return res.status(200).json({ accessToken, refreshToken });
          });
        })(req, res);
      });

      /**
       * Access Token 재발급
       */
      this.Router.post("/refresh", (req, res, next) => {
        passport.authenticate(
          "refresh-jwt",
          { session: false },
          (err, user) => {
            const accessToken = jwt.sign(
              { id: user },
              Config.getInstance().server.jwtAccessTokenSecret,
              { expiresIn: Config.getInstance().server.jwtAccessTokenExpire }
            );
            res.status(200).json({ accessToken });
          }
        )(req, res);
      });

      /* 로그인 요청 */
      this.Router.post(
        "/auth",
        passport.authenticate("local", {
          successRedirect: "/",
          failureRedirect: "/login",
          failureFlash: true,
        })
      );

      /* 회원가입 폼 (테스트용 샘플) */
      this.Router.get("/signup", (req, res) => {
        let html: string = `
                <!doctype html>
                <html>
                <head>
                <title>회원가입</title>
                <meta charset="utf-8">
                </head>
                <body>
                    <form action="/signup_process" method="post">
                        <p><input type="text" name="id" placeholder="email"></p>
                        <p><input type="password" name="pw" placeholder="password"></p>
                        <p><input type="text" name="name" placeholder="name"></p>
                        <p><input type="text" name="tel" placeholder="tel"></p>
                        <p><input type="submit" value="submit"></p>
                    </form>
                </body>
                </html>`;
        res.end(html);
      });

      /* 회원가입 요청 */
      this.Router.post("/signup_process", (req, res, next) => {
        return passport.authenticate(
          "local-signup",
          {
            successRedirect: "/",
            failureRedirect: "/signup",
            failureFlash: true,
          },
          (err, user) => {
            if (user === "1062") {
              res.status(400).json({ ok: false });
            } else {
              res.status(200).json({ ok: true });
            }
          }
        )(req, res);
      });

      /* 로그아웃 */
      this.Router.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
      });
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}