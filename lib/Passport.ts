import passport from "passport";
import passportLocal from "passport-local";
import passportJwt from "passport-jwt";
import UserDAO from "./dao/UserDAO";
import User from "./User";
import { UserDTO } from "./dto/UserDTO";
import Config from "./Config";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export default class Passport {
  constructor(passport: passport.PassportStatic) {
    /* 로그인 세션 */
    passport.serializeUser((user, done) => {
      console.log('SerializeUser - ', user);
      done(null, user);
    });

    passport.deserializeUser((id: string, done) => {
      console.log('DeserializeUser - ', id);
      UserDAO.getUserById(id).then((data) => {
        done(null, data.id);
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
          UserDAO.getUserById(username).then((user) => {
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
              });
          });
        }
      )
    );

    /* jwt Strategy */
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: Config.getInstance().server.jwtSecret,
        },
        (payload, done) => {
          return done(null, payload.id)
          // UserDAO.getUserById(payload.id).then((data) => {
          //   console.log(payload.id);
          //   if (!data) {
          //     return done(null, false);
          //   }

          //   return done(null, data);
          // });
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
          UserDAO.insert(new UserDTO(username, req.body.name, cryptResult[0], cryptResult[1], req.body.tel, "", 0, 0))
            .then(id => {
              return done(null, id);
            })
            .catch(err => {
              return done(null, false, { message: "Duplicaed ID" });
            });
        }
      })
    }));
  }
}