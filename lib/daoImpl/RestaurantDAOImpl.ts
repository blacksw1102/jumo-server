import RestaurantDAO from "../dao/RestaurantDAO";
import { RestaurantSearchResult } from "../dto/RestaurantDTO";

import DB from "../DB";

class RestaurantDAOImpl implements RestaurantDAO {
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
          console.log(err);
        }

        conn.query(
          "INSERT INTO restuarant VALUES(?, ?, ?, ?)",
          [name, address, description, categoryId],
          (err, data) => {
            if (err) {
              console.log(err);
            }

            let result = data.map((item: any) => {
              return {
                err: ``,
              };
            });

            // 확인용 로그
            console.log(data);
            conn.release();
            resolve(result);
          }
        );
      });
    });
  }

  getSearchResult(keyword: string): Promise<RestaurantSearchResult[]> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        // DB 에러 처리
        if (err) {
          console.log(err);
        }

        conn.query(
          "SELECT *, COUNT(*) as review_count FROM restaurant join review WHERE restaurant_name LIKE ?",
          [`%${keyword}%`],
          (err, data) => {
            if (err) {
              console.log(err);
            }

            let result = data.map((item: any) => {
              return new RestaurantSearchResult(
                item.restaurant_name, item.restaurant_score, item.restaurant_image, item.restaurant_description, item.average_cooking_time, item.review_count
              );
            });

            // 확인용 로그
            console.log(data);
            conn.release();
            resolve(result);
          }
        );
      });
    });
  }
}

export default new RestaurantDAOImpl();
