import UserDAO from "../dao/UserDAO";
import { UserDTO } from "../dto/UserDTO";

import DB from "../DB";
import { rejects } from "node:assert";

class UserDAOImpl implements UserDAO {
  getUserById(userId: string): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        if (err) {
          console.log("DB Connection ERROR");
          reject();
        }
        conn.query("SELECT * FROM user WHERE id=?", [userId], (err, data) => {
          let user = new UserDTO(data[0].id, data[0].name, data[0].pw, data[0].salt, data[0].tel, data[0].profile_image, data[0].point, data[0].usercol);
          conn.release();

          if (err) {
            console.log(`[Failed] ${userId} : DataBase Error`);
          }
          if (!user) {
            console.log(`[Failed] ${userId} : Wrong Id`);
          }
          resolve(user);
        });
      });
    });
  }

  insert(user: UserDTO): Promise<void> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        if (err) {
          console.log("DB Connection Error");
        }

        conn.query("INSERT INTO user (id, name, pw, salt, tel) VALUES (?, ?, ?, ?, ?);",
          [user.id, user.name, user.pw, user.salt, user.tel],
          (err, data) => {
            if (err) {
              console.log("...");
            }
          });

        resolve();
      });
    });
  }
}

export default new UserDAOImpl();