import express from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";

export default class RestaurantRouter {
  private Router: express.Router;

  constructor() {
    this.Router = express.Router();

    /* 검색 */
    this.Router.get("/search-result", (req, res, next) => {
      const keyword: string = req.query.keyword as string;

      RestaurantDAO.getSearchResult(keyword).then((result) => {
        res.json(result);
      });
    });

    this.Router.get("/:id", async (req, res, next) => {
      let result = RestaurantDAO.getRestaurantInfo(req.params.id);
      res.json(result);
    });
  }

  public getRouter(): express.Router {
    return this.Router;
  }
}
