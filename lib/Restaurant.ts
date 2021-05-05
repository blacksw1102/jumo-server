import DB from "./DB";

import logger from "./logger";

export default class Restaurant {
  constructor() { }

  static getSearchResult(keyword: string) {
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
              return {
                name: item.restaurant_name,
                score: item.restaurant_score,
                image: item.restaurant_image,
                description: item.restaurant_description,
                average_cooking_time: item.average_cooking_time,
                review_count: item.review_count,
              };
            });

            conn.release();
            resolve(result);
          }
        );
      });
    });
  }
  /**
   * 
   * @param name 식당의 이름
   * @param address 식당의 주소
   * @param description 식당의 설명
   * @param categoryId 식당의 카테고리
   */
  static createRestuarant(name: string, address: string, description: string, categoryId: number) {
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
              console.log(err);
            }

            let result = data.map((item: any) => {
              return {
                err: ``
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

  static uploadRestuarantImage(image: Buffer) {

  }
}
