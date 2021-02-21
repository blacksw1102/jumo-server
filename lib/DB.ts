import mysql from "mysql";
import config from "./Config";

export default class DBConnectionPool {
    static pool: mysql.Pool;

    static async createPool() {
        try {
            DBConnectionPool.pool = mysql.createPool(config.getInstance().db);
            console.log("DB Connection Pool 생성 성공");
            console.log(config.getInstance().db);
        } catch(e) {
            console.log("DB Connection Pool 생성 오류");
            console.log(e);
        }
    }

    static getPool() {
        return DBConnectionPool.pool;
    }
}