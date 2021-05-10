import express from "express";
import passport from "passport";

import UserController from "../controller/UserController";

export default class User {
    private Router: express.Router;

    constructor() {
        this.Router = express.Router();

        this.Router.get("/:userId/favorites", passport.authenticate("jwt", { session: false }), UserController.getFavroites);

        this.Router.get("/:userId/orders", passport.authenticate("jwt", { session: false }), UserController.getOrders);
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}