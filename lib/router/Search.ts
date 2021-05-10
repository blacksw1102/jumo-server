import express from "express";
import SearchController from "../controller/SearchController"

export default class SearchRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    this.Router.get("/", SearchController.restaurantSearch);
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
