import { RestaurantSearchResultDTO } from "../dto/RestaurantDTO";

import DB from "../DB";

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

  getSearchResult(keyword: string): Promise<RestaurantSearchResultDTO[]> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        // DB 에러 처리
        if (err) {
          console.log(err);
        }

        conn.query(
          "SELECT res.*, (SELECT COUNT(*) FROM review WHERE company_no = res.company_no) AS review_cnt FROM restaurant res WHERE res.name LIKE ?",
          [`%${keyword}%`],
          (err, data) => {
            if (err) {
              console.log(err);
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
            console.log(data);
            conn.release();
            resolve(result);
          }
        );
      });
    });
  }

  public getRestaurantInfo(company_no: string) {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        // DB 에러 처리
        if (err) {
          console.log(err);
        }

        conn.query(
          "SELECT res.company_no, res.name, res.address, res.profile_image, res.description, COUNT(rev.company_no), ISNULL(AVG(rev.score))=0 FROM restaurant res LEFT JOIN review rev ON res.company_no = rev.company_no WHERE res.company_no = ? GROUP BY res.company_no;",
          [`%${company_no}%`],
          (err, data) => {
            if (err) {
              console.log(err);
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
            console.log(data);
            conn.release();
            resolve(result);
          }
        );
      });
    });
  }
}

export default new RestaurantDAO();
