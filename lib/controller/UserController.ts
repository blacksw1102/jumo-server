import { Request, Response, NextFunction } from "express";

import logger from "../logger";

import UserDAO from "../dao/UserDAO";
import OrderDAO from "../dao/OrderDAO";
import FavoriteDAO from "../dao/FavoriteDAO";

class UserController {
    public getFavroites(req: Request, res: Response, next: NextFunction) {
        if (req.user !== req.params.userId) {
            logger.warn(`${req.user} doesn't have access to ${req.params.userId}`)
            res.status(400).json();
        }
        FavoriteDAO.getFavoriteListByUserId(req.params.userId).then(data => {
            logger.debug(JSON.stringify(data));
            res.status(200).json(data);
        });
    }

    public getOrders(req: Request, res: Response, next: NextFunction) {
        if (req.user !== req.params.userId) {
            logger.warn(`${req.user} doesn't have access to ${req.params.userId}`)
            res.status(400).json();
        }
        OrderDAO.getOrderListByUserId(req.params.userId).then(data => {
            logger.debug(JSON.stringify(data, null, 4));
            res.status(200).json(data);
        });
    }
}

export default new UserController();