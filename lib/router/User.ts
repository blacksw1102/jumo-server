import express from "express";
import passport from "passport";

import logger from "../logger";

import UserDAO from "../dao/UserDAO";
import FavoriteDAO from "../dao/FavoriteDAO";

export default class User {
    private Router: express.Router;

    constructor() {
        this.Router = express.Router();

        this.Router.get("/:userId/favorites", passport.authenticate("jwt", { session: false }), (req, res, next) => {
            if (req.user !== req.params.userId) {
                logger.warn(`${req.user} doesn't have access to ${req.params.userId}`)
                res.status(400).json();
            }
            FavoriteDAO.getFavoriteListByUserId(req.params.userId).then(data => {
                logger.debug(JSON.stringify(data));
                res.status(200).json(data);
            });
        });
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}