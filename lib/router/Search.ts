import express from "express";

export default class AuthRouter {
    private Router: express.Router;

    constructor() {
        this.Router = express.Router();

        /* 검색 */
        this.Router.post("/search", (req, res) => {

        });
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}