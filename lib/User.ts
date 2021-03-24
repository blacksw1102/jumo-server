import crypto from "crypto";
import { resolve } from "node:path";

export default class User {
    constructor() {

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
}