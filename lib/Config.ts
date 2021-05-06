import mysql from "mysql";
import fs from "fs";
import path from "path";

import logger from "./logger";
export interface ServerConfig {
  port: number,
  jwtAccessTokenSecret: string,
  jwtAccessTokenExpire: string
  jwtRefreshTokenSecret: string,
  jwtRefreshTokenExpire: string
}
export default class Config {
  public static CONFIG_PATH = path.join(
    __dirname,
    "..",
    "config",
    "config.json"
  );
  private static config: Config = new Config();

  public db: mysql.ConnectionConfig;
  public server: ServerConfig;

  private constructor() {
    this.db = {};
    this.server = {
      port: 8080,
      jwtAccessTokenSecret: "secret",
      jwtAccessTokenExpire: "30m",
      jwtRefreshTokenSecret: "secrret",
      jwtRefreshTokenExpire: "14d"
    };
  }

  /**
   * 설정에 관련된 파일을 읽어서 저장함
   */
  public static async load() {
    return new Promise((resolve, reject) => {
      fs.readFile(Config.CONFIG_PATH, (err, data) => {
        if (err) {
          logger.error("Config load error");
          logger.error(err);
          reject();
        } else {
          Config.config = JSON.parse(data.toString());
          logger.info("Config load success");
          logger.info(JSON.stringify(Config.config, null, 4));
          resolve(null);
        }
      });
    });
  }

  public static getInstance() {
    return Config.config;
  }
}
