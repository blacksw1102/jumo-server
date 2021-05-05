import winston, { transports, format } from "winston";

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const logger = winston.createLogger({
    transports: [
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss"
                }),
                format.colorize(),
                format.printf((info: TransformableInfo) => `[${info.timestamp}] (${info.level}) ${info.message}`)
            )
        })
    ]
});

export default logger;