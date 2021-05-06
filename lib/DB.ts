import mysql from "mysql";
import config from "./Config";
import logger from "./logger";

export default class DBConnectionPool {
    static pool: mysql.Pool;

    static async createPool() {
        try {
            DBConnectionPool.pool = mysql.createPool(config.getInstance().db);
            logger.info("DB Connection Pool 생성 성공");
        } catch(e) {
            logger.error("DB Connection Pool 생성 오류");
            logger.error(e);
        }
    }

    static getPool() {
        return DBConnectionPool.pool;
    }
}