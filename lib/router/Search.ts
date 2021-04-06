import express from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";

export default class SearchRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    /* 검색 */
    this.Router.post("/search", (req, res) => {
      RestaurantDAO.getSearchResult(req.body.keyword).then((result) => {
        res.json(result);
      });
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
