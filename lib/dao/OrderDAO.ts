import { OrderDTO } from "../dto/OrderDTO";

import DB from "../DB";
import logger from "../logger";

class OrderDAO {
    public getOrderListByUserId(userId: string) {
        return new Promise((resolve, reject) => {
            DB.getPool().getConnection((err, conn) => {
                if (err) {
                    logger.error("OrderDAO.getOrderListByUserId() DB Connect Error" + err);
                }

                conn.query(
                  `
                    SELECT
                        o.id,
                        o.company_no,
                        o.date,
                        r.name,
                        o.payment_type,
                        o.request_msg,
                        oi.price,
                        oi.count,
                        m.name,
                        op.name,
                        op.price
                    FROM orders o
                        LEFT JOIN restaurant r ON r.company_no = o.company_no
                        LEFT JOIN order_item oi ON o.id = oi.orders_id
                        LEFT JOIN menu m ON oi.menu_id = m.id
                        LEFT JOIN options op ON oi.option_id = op.id;
                `,
                  [userId],
                  (err, data) => {
                    if (err) {
                      logger.error(
                        "OrderDAO.getOrderListByUserId() DB Query Error" + err
                      );
                    }

                    let result = data.map((item: any) => {
                      return new OrderDTO();
                    });

                    resolve(result);
                  }
                );
            });
        });
    }
}

export default new OrderDAO();