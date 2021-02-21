import passport from "passport";
import passportLocal from "passport-local";
import DB from "./DB";

const LocalStrategy = passportLocal.Strategy;

export default class Passport {
  constructor(passport: passport.PassportStatic) {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "id",
          passwordField: "pw",
        },
        (username, password, done) => {
          DB.getPool().getConnection((err, conn) => {
            if (err) {
              console.log(err);
            }
            conn.query(
              "SELECT * FROM user WHERE user_id=? AND pw=?",
              [username, password],
              (err, data) => {
                console.log(data);
                if (err) {
                    return done(err);
                }
                if(!data) {
                    return done(null, false, { message: "undefined"});
                }
                return done(null, data.user_id);
              }
            );
            conn.end();
          });
        }
      )
    );
  }
}
