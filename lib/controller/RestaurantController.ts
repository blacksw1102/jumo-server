import { Request, Response, NextFunction } from "express";
import Restaurant from "../Restaurant";
import RestaurantDAO from "../dao/RestaurantDAO";
import jwt from "jsonwebtoken";
import Config from "../Config";

class RestaurantController {
  public async getRestaurantInfo(req: Request, res: Response, next: NextFunction) {
    let token: string = req.headers.authorization?.split("Bearer ")[1] || "";
    let userId: string = "";

    if (token !== "") {
      let payload = jwt.verify(
        token,
        Config.getInstance().server.jwtAccessTokenExpire
      );
      console.debug(JSON.stringify(payload));
    }

    let result = await RestaurantDAO.getRestaurantInfo(userId, req.params.id);
    res.status(200).json(result);
  }

  public async getRestaurantTopArea(req: Request, res: Response, next: NextFunction) {
    let result = await RestaurantDAO.getRestaurantTopArea(req.params.id);
    res.status(200).json(result);
  }
}

export default new RestaurantController();