import { RestaurantSearchResultDTO, RestaurantInfoDTO } from "../dto/RestaurantDTO";

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

  public getRestaurantInfo(userId: string, companyNo: string) {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        // DB 에러 처리
        if (err) {
          logger.error(err);
        }

        conn.query(
          `
            SELECT
              res.company_no,
              res.name,
              res.address_base,
              res.address_detail,
              res.profile_image,
              res.description,
              res.user_id,
              res.category_name,
              COUNT(rev.orders_id) as review_cnt,
              IFNULL(AVG(rev.score), 0) as review_score_avg,
              ISNULL(fav.company_no)=FALSE as is_fav
            FROM restaurant res
            LEFT JOIN review rev ON res.company_no = (SELECT company_no FROM orders WHERE orders.id = rev.orders_id)
            LEFT JOIN favorite fav ON fav.user_id = ? AND fav.company_no = res.company_no
            WHERE res.company_no = ?
            GROUP BY res.company_no;
          `,
          [userId, companyNo],
          (err, data) => {
            if (err) {
              logger.error(err);
              resolve([]);
            }

            let result = data.map((item: any) => {
              return new RestaurantInfoDTO(
                item.company_no, item.name, item.address_base, item.address_detail, item.profile_image, item.description, item.user_id, item.category_name, item.review_cnt, item.review_score_avg, item.is_fav
              );
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
}

export default new RestaurantDAO();
