import express from "express";
import DB from "../DB";

export default class SearchRouter {
    private Router: express.Router;

    constructor() {
        this.Router = express.Router();

        /* 검색 */
        this.Router.post("/search", (req, res) => {
            DB.getPool().getConnection((err, conn) => {
                // DB 에러 처리
                if(err) {
                    console.log(err);
                }
                
                conn.query(
                  "SELECT *, COUNT(*) as review_count FROM restaurant join review WHERE restaurant_name LIKE ?",
                  [`%${req.body.keyword}%`],
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
                        review_count: item.review_count
                      };
                    });

                    // 확인용 로그
                    console.log(data);
                    res.json(result);
                    conn.release();
                  }
                );
            });
        });
    }

    public getRouter(): express.Router {
        return this.Router;
    }
}