import DB from "./DB";

interface RestaurantSearchResault {
  name: string,
  score: number,
  image: string,
  description: string,
  average_cooking_time: string,
  review_count: number
}

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
