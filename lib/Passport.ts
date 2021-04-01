import passport from "passport";
import passportLocal from "passport-local";
import DB from "./DB";
import User from "./User";

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
      User.getUserById(id).then((data) => {
        done(null, data);
      });
    });

    /* 로그인 */
    passport.use(
      new LocalStrategy(
        {
          usernameField: "id",
          passwordField: "pw",
          passReqToCallback: true
        },
        (req, username, password, done) => {
          User.getUserById(username).then((user) => {
            User.comparePassword(password, user.pw, user.salt)
              .then((result) => {
                if (result) {
                  console.log(`[Succeed] ${username} Sign in`);
                  return done(null, user.id);
                }
              })
              .catch((err) => {
                console.log(`[Failed] ${username} : Wrong Password`);
                return done(null, false, { message: "Wrong password" });
              });;
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
      User.cryptPassword(password).then((cryptResult) => {
        {
          DB.getPool().getConnection((err, conn) => {
            conn.query('INSERT INTO user (id, name, pw, salt, tel) VALUES (?, ?, ?, ?, ?);', [username, req.body.name, cryptResult[0], cryptResult[1], req.body.tel], (err, data) => {
              if (err) {
                console.log(err);
                return done(null, false, { message: 'Duplicated ID' });
              } else {
                return done(null, username);
              }
            });
          });
        }
      })
    }));
  }
}