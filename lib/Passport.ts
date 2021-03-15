import passport from "passport";
import passportLocal from "passport-local";
import DB from "./DB";

const LocalStrategy = passportLocal.Strategy;

export default class Passport {
  constructor(passport: passport.PassportStatic) {
    /* 로그인 세션 */
    passport.serializeUser((user, done) => {
      console.log('SerializeUser - ', user);
      done(null, user);
    });

    passport.deserializeUser((id, done) => {
      console.log('DeserializeUser - ', id);
      DB.getPool().getConnection((err, conn) => {
        conn.query('SELECT * FROM user WHERE user_id = ?', [id], (err, data) => {
          done(null, data);
        });
      });
    });

    /* 로그인 */
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
                if (!data) {
                  return done(null, false, { message: "undefined" });
                }
                return done(null, data.user_id);
              }
            );
            conn.end();
          });
        }
      )
    );

    /* 회원가입 */
    passport.use('local-signup', new LocalStrategy({
      usernameField: 'id',
      passwordField: 'pw',
      passReqToCallback: true
    }, (req, username, password, done) => {
      DB.getPool().getConnection((err, conn) => {
        conn.query('INSERT INTO user VALUES (?, ?, ?, ?, null, 0);', [username, password, req.body.name, req.body.tel], (err, data) => {
          if (err) {
            console.log(err);
            return done(null, false, { message: 'Duplicated ID' });
          } else {
            return done(null, username);
          }
        });
      });
    }));
  }
}
