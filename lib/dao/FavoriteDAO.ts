import { FavoriteList } from "../dto/FavoriteDTO";

import DB from "../DB";
import logger from "../logger";
import { resolve } from "node:path";

class FavoriteDAO {
    public getFavoriteListByUserId(userId: string) {
        return new Promise((resolve, reject) => {
            DB.getPool().getConnection((err, conn) => {
                if (err) {
                    logger.error("FavoriteDAO DB Connect Error" + err);
                }

                conn.query("query", [userId], (err, data) => {
                    if (err) {
                        logger.error("FavoriteDAO DB Query Error" + err);
                    }
                })
            });
        })
    }
}

export default new FavoriteDAO();