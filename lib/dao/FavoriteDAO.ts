import { FavoriteList } from "../dto/FavoriteDTO";

import DB from "../DB";
import logger from "../logger";

class FavoriteDAO {
    public getFavoriteListByUserId(userId: string) {
        return new Promise((resolve, reject) => {
            DB.getPool().getConnection((err, conn) => {
                if (err) {
                    logger.error("FavoriteDAO DB Connect Error" + err);
                }

                conn.query(`
                    SELECT
                        res.company_no,
                        res.name,
                        res.profile_image,
                        COUNT(orders.id) as order_cnt,
                        COUNT(rev.orders_id) as review_cnt,
                        IFNULL(AVG(rev.score), 0) as review_score_avg
                    FROM favorite fav
                    LEFT JOIN restaurant res ON res.company_no = fav.company_no
                    LEFT JOIN orders ON orders.company_no = res.company_no
                    LEFT JOIN review rev ON rev.orders_id = orders.id
                    WHERE fav.user_id="test"
                    GROUP BY res.company_no;
                `, [userId], (err, data) => {
                    if (err) {
                        logger.error("FavoriteDAO DB Query Error" + err);
                    }

                    let result = data.map((item: any) => {
                        return new FavoriteList(
                            item.company_no,
                            item.profile_image,
                            item.name,
                            item.review_avg,
                            item.review_cnt,
                            item.order_cnt
                        );
                    });
                    logger.debug(JSON.stringify(data));
                    conn.release();
                    resolve(result);
                });
            });
        });
    }
}

export default new FavoriteDAO();