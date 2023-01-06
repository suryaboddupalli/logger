import path from 'path';
import { createLogger, transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const transport = (dirname?: string, level?: string) =>
  new DailyRotateFile({
    filename: `%DATE%.log`,
    dirname: path.resolve(`${dirname}/${level || 'combined'}`),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '7d',
    level,
  });

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  defaultMeta: { service: 'app' },
  transports: [transport()],
});

/** Logs on Development */
export const EnvFile = (env: string) => {
  if (['local', 'development'].includes(env)) {
    logger.add(new transports.Console({ format: format.simple() }));
  }
};

export const Logger = logger;
