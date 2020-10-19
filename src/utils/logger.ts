import * as winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf } = winston.format;

const myFormat = printf((info) => {
  return `${info.timestamp}: ${
    typeof info.message === "string"
      ? info.message
      : JSON.stringify(info.message)
  }`;
});

const timeFormat = timestamp({
  format: "YYYY-MM-DD HH:mm:ss Z",
});

const transportRuntime = new winston.transports.DailyRotateFile({
  filename: "./logs/logs-%DATE%.log",
  datePattern: "YYYYMMDD",
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "20d",
  level: "info",
});

const transportError = new winston.transports.DailyRotateFile({
  filename: "./logs/errors-%DATE%.log",
  datePattern: "YYYYMMDD",
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "20d",
  level: "error",
});

const log = winston.createLogger({
  format: combine(timeFormat, myFormat),
  transports: [
    transportRuntime,
    transportError,
    new winston.transports.Console(),
  ],
});

module.exports = {
  info(message: string) {
    log.info(message);
  },
  error(message: string) {
    log.error(message);
  },
};
