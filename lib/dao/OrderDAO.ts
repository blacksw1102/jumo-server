import { OrderDTO, MenuList, OptionList } from "../dto/OrderDTO";

import DB from "../DB";
import logger from "../logger";

class OrderDAO {
  public getOrderListByUserId(userId: string) {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        if (err) {
          logger.error(
            "OrderDAO.getOrderListByUserId() DB Connect Error" + err
          );
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
                        oi.id as order_item_id,
                        oi.price as order_item_price,
                        oi.count as order_item_count,
                        m.name as order_item_name,
                        op.id as option_id,
                        op.name as option_name,
                        op.price as option_price
                    FROM orders o
                        LEFT JOIN restaurant r ON r.company_no = o.company_no
                        LEFT JOIN order_item oi ON o.id = oi.orders_id
                        LEFT JOIN menu m ON oi.menu_id = m.id
                        LEFT JOIN options op ON oi.option_id = op.id
                    WHERE o.user_id = ?
                    ORDER BY date DESC;
                `,
          [userId],
          (err, data) => {
            if (err) {
              logger.error(
                "OrderDAO.getOrderListByUserId() DB Query Error" + err
              );
            }

            let result: OrderDTO[] = [];
            let order: OrderDTO;
            let menu: MenuList;

            data.forEach((item: any) => {
              /* orderId가 다를 시 새 객체 생성 */
              if (
                result.length <= 0 ||
                item.order_id !== result[result.length - 1].orderId
              ) {
                order = new OrderDTO(
                  item.order_id,
                  item.company_no,
                  item.date,
                  item.restaurant_name,
                  0,
                  item.payment_type,
                  item.request_msg,
                  []
                );
                result.push(order);
              }

              let menuList = order.menuList;

              if (
                menuList.length <= 0 ||
                item.order_item_id !== menuList[menuList.length - 1]
              ) {
                /* menu 객체 추가 */
                menu = new MenuList(
                  item.order_item_id,
                  item.order_item_name,
                  item.order_item_price,
                  []
                );

                order.totalPrice += menu.price;

                order.menuList.push(menu);
              }

              if(item.option_id) {
                let optionList = menu.optionList;
                optionList[optionList.length] = new OptionList(
                    item.option_id,
                    item.option_name,
                    item.option_price
                );
              }

              order.totalPrice += item.option_price;
            });
            logger.debug(JSON.stringify(data));
            conn.release();
            resolve(result);
          }
        );
      });
    });
  }
}

export default new OrderDAO();
