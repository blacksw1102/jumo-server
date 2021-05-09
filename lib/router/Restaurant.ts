import express from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";
import jwt from "jsonwebtoken";
import Config from "../Config";

export default class RestaurantRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    this.Router.get("/:id", async (req, res, next) => {
      let token: string = req.headers.authorization?.split('Bearer ')[1] || "";
      let userId: string = "";

      if (token !== "") {
        let payload = jwt.verify(token, Config.getInstance().server.jwtAccessTokenExpire);
        console.debug(JSON.stringify(payload));
      }

      let result = await RestaurantDAO.getRestaurantInfo(userId, req.params.id);
      res.status(200).json(result);
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
