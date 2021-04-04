import crypto from "crypto";
import { resolve } from "node:path";

import DB from "./DB";

export default class User {
    id: string;
    name: string;
    pw: string;
    salt: string;
    tel: number;
    profile_image: number;
    point: number;
    usercol: number;

    constructor() {
        this.id = "";
        this.name = "";
        this.pw = "";
        this.salt = "";
        this.tel = 0;
        this.profile_image = 0;
        this.point = 0;
        this.usercol = 0
    }

    static cryptPassword(password: string) {
        return new Promise<string[]>((resolve, reject) => {
            crypto.randomBytes(64, (err, buf) => {
                crypto.pbkdf2(password, buf.toString('base64'), 9583, 64, 'sha512', (err, key) => {
                    resolve([key.toString("base64"), buf.toString("base64")]);
                });
            });
        });
    }

    static comparePassword(inputPassword: string, storePassword: string, salt: string) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(inputPassword, salt, 9583, 64, 'sha512', (err, key) => {
                if (key.toString("base64") === storePassword)
                    resolve(true);
                else
                    reject();
            });
        });
    }

    static getUserById(userId: string): Promise<User> {
        return new Promise((resolve, reject) => {
            DB.getPool().getConnection((err, conn) => {
                if (err) {
                    console.log("DB Connection ERROR");
                    reject();
                }
                conn.query("SELECT * FROM user WHERE id=?", [userId], (err, data) => {
                    let user = data[0]
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

    signUp() {

    }
}