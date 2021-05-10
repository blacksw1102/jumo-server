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

  getSearchResult(
    keyword: string,
    category: string
  ): Promise<RestaurantSearchResultDTO[]> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        let query = `SELECT res.*, (SELECT COUNT(*) FROM review WHERE company_no = res.company_no) AS review_cnt
          FROM restaurant res`;
        // DB 에러 처리
        if (err) {
          logger.error(err.toString());
        }

        if (keyword === "") {
          `res.name LIKE ?`;
        }

        conn.query(this.makeSearchListQuery(keyword, category), this.makeSearchListQueryVariable(keyword, category), (err, data) => {
          if (err) {
            logger.error(err.toString());
            resolve([]);
          }

          let result = data.map((item: any) => {
            return new RestaurantSearchResultDTO(
              item.company_no,
              item.name,
              item.score,
              item.profile_image,
              item.description,
              item.average_cooking_time,
              item.review_cnt,
              item.review_score_avg,
              item.order_cnt
            );
          });

          // 확인용 로그
          logger.debug(JSON.stringify(data));
          conn.release();
          resolve(result);
        });
      });
    });
  }

  private makeSearchListQuery(keyword: string, category: string) {
    // let query = `SELECT res.*, (SELECT COUNT(*) FROM review WHERE company_no = res.company_no) AS review_cnt
    //           FROM restaurant res`;

    let query = `
      SELECT res.*, COUNT(rev.orders_id) AS review_cnt, COUNT(ord.id) AS order_cnt, IFNULL(AVG(rev.score), 0) AS review_score_avg
        FROM restaurant res
        LEFT JOIN orders ord ON ord.company_no = res.company_no
        LEFT JOIN review rev ON ord.id = rev.orders_id
    `;
    let whereList = [];
    if (keyword !== "") {
      whereList.push(`res.name LIKE ?`);
    }
    if (category !== "") {
      whereList.push(`res.category_name = ?`);
    }

    if(whereList.length > 0) {
      query += ' WHERE ';
      query += whereList.shift();
    }

    while(whereList.length > 0) {
      query += " AND ";
      query += whereList.shift();
    }

    query += " GROUP BY res.company_no";

    logger.debug(query);

    return query;
  }

  private makeSearchListQueryVariable(keyword: string, category: string) {
    let result = [];

    if (keyword !== "") {
      result.push(`%${keyword}%`);
    }
    if(category !== "") {
      result.push(`${category}`);
    }

    logger.debug(result);
    return result;
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
                item.company_no,
                item.name,
                item.address_base,
                item.address_detail,
                item.profile_image,
                item.description,
                item.user_id,
                item.category_name,
                item.review_cnt,
                item.review_score_avg,
                item.is_fav
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
