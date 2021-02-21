import express from "express";
import passport from "passport";

export default class AuthRouter {
    private Router: express.Router;

    constructor() {
        this.Router = express.Router();

        /* 로그인 영역 */
        this.Router.get("/", (req, res) => {
            
        });

        /* 로그인 요청 */
        this.Router.post("/auth", passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
        }));
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}