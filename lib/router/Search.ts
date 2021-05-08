import express from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";

export default class SearchRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    this.Router.get("/", (req, res, next) => {
      const keyword: string = req.query.keyword as string || "";
      const category: string = req.query.category as string || "";

      RestaurantDAO.getSearchResult(keyword, category).then((result) => {
        res.json(result);
      });
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
