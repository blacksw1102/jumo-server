import express, { NextFunction } from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";

class SearchController {
  public restaurantSearch(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const keyword: string = (req.query.keyword as string) || "";
    const category: string = (req.query.category as string) || "";

    RestaurantDAO.getSearchResult(keyword, category).then((result) => {
      res.json(result);
    });
  }
}

export default new SearchController();