import UserDAO from "../dao/UserDAO";
import UserModel from "../models/UserModel";

import DB from "../DB";

class UserDAOImpl implements UserDAO {
  getUserById(userId: string): Promise<UserModel> {
    return new Promise((resolve, reject) => {
      DB.getPool().getConnection((err, conn) => {
        if (err) {
          console.log("DB Connection ERROR");
          reject();
        }
        conn.query("SELECT * FROM user WHERE id=?", [userId], (err, data) => {
          let user = data[0];
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