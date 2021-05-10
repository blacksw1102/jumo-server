import express, { NextFunction } from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";

class SearchController {
  public async restaurantSearch(
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) {
    const keyword: string = (req.query.keyword as string) || "";
    const category: string = (req.query.category as string) || "";

    let result = await RestaurantDAO.getSearchResult(keyword, category);
    res.json(result);
  }
}

export default new SearchController();