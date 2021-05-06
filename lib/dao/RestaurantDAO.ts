import { RestaurantSearchResultDTO } from "../dto/RestaurantDTO";

import DB from "../DB";
import logger from "../logger";

class RestaurantDAO {
  create(
    name: string,
    address: string,
    description: string,
    categoryId: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        // DB 에러 처리
        if (err) {
          logger.error(err);
        }

        conn.query(
          "INSERT INTO restuarant VALUES(?, ?, ?, ?)",
          [name, address, description, categoryId],
          (err, data) => {
            if (err) {
              logger.error(err);
            }

            let result = data.map((item: any) => {
              return {
                err: ``,
              };
            });

            // 확인용 로그
            logger.debug(JSON.stringify(data));
            conn.release();
            resolve(result);
          }
        );
      });
    });
  }

  getSearchResult(keyword: string): Promise<RestaurantSearchResultDTO[]> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        // DB 에러 처리
        if (err) {
          logger.error(err);
        }

        conn.query(
          "SELECT res.*, (SELECT COUNT(*) FROM review WHERE company_no = res.company_no) AS review_cnt FROM restaurant res WHERE res.name LIKE ?",
          [`%${keyword}%`],
          (err, data) => {
            if (err) {
              logger.error(err);
              resolve([]);
            }

            let result = data.map((item: any) => {
              return new RestaurantSearchResultDTO(
                item.name,
                item.score,
                item.profile_image,
                item.description,
                item.average_cooking_time,
                item.review_cnt
              );
            });

            // 확인용 로그
            logger.debug(data);
            conn.release();
            resolve(result);
          }
        );
      });
    });
  }
}

export default new RestaurantDAO();
