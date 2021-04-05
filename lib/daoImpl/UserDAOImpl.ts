import UserDAO from "../dao/UserDAO";
import { User } from "../dto/UserDTO";

import DB from "../DB";

class UserDAOImpl implements UserDAO {
  getUserById(userId: string): Promise<User> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        if (err) {
          console.log("DB Connection ERROR");
          reject();
        }
        conn.query("SELECT * FROM user WHERE id=?", [userId], (err, data) => {
          let user = new User(data[0].id, data[0].name, data[0].pw, data[0].salt, data[0].tel, data[0].profile_image, data[0].point, data[0].usercol);
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
}

export default new UserDAOImpl();