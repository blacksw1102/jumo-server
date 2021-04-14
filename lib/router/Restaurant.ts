import express from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";

export default class RestaurantRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    /* 검색 */
    this.Router.get("/:keyword", (req, res, next) => {
      RestaurantDAO.getSearchResult(req.params.keyword).then((result) => {
        res.json(result);
      });
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
