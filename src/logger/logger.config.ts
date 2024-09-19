import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as packageJSON from '../../package.json';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      level: 'silly', // Set to 'silly' to log everything
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} ${level}: ${message}`,
        ),
      ),
    }),
    new winston.transports.DailyRotateFile({
      level: 'silly', // Set to 'silly' to log everything
      dirname: './logs',
      filename: `${packageJSON.name}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};
