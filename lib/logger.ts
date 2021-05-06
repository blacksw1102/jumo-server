import { StreamOptions } from "morgan";
import winston, { transports, format } from "winston";

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const logger = winston.createLogger({
  level: level(),
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) =>
            `[${info.timestamp}] (${info.level}) ${info.message}`
        )
      ),
    }),
  ],
});

const webLogStream: StreamOptions = {
  write: (message) => {
    logger.http(message.split("\n")[0]);
  }
}

export { webLogStream };
export default logger;