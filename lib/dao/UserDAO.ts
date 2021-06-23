import { UserDTO, UserSigninDTO } from "../dto/UserDTO";
import jwt from "jsonwebtoken";

import logger from "../logger";
import DB from "../DB";

class UserDAO {
  getUserById(userId: string): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        if (err) {
          logger.error("DB Connection ERROR");
          reject();
        }
        conn.query("SELECT * FROM user WHERE id=?", [userId], (err, data) => {
          if (err) {
            logger.error(`[Failed] ${userId} : DataBase Error`);
            reject();
          }

          if(data.length === 0) {
            logger.info(`[Failed] ${userId} : Wrong Id`);
            conn.release();
            reject();
          }
          else {
            let user = new UserDTO(
              data[0].id,
              data[0].name,
              data[0].pw,
              data[0].salt,
              data[0].tel,
              data[0].profile_image,
              data[0].point,
              data[0].usercol,
              data[0].birth_date
            );

            conn.release();
            resolve(user);
          }
        });
      });
    });
  }

  insert(user: UserDTO): Promise<string> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        if (err) {
          logger.error("DB Connection Error");
        }
        
        conn.query("INSERT INTO user (id, name, pw, salt, tel, birth_date) VALUES (?, ?, ?, ?, ?, ?);",
          [user.id, user.name, user.pw, user.salt, user.tel, user.birth_date],
          (err, data) => {
            if (err) {
              reject(err);
            }
            conn.release();
            resolve(user.id);
          });
      });
    });
  }
}

export default new UserDAO();