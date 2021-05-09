import express from "express";
import RestaurantController from "../controller/RestaurantController";
export default class RestaurantRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    this.Router.get("/:id", RestaurantController.getRestaurantInfo);
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
