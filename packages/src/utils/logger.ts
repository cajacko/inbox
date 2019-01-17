import Logger from 'src/lib/modules/Logger';

type levels = 'debug' | 'info' | 'log' | 'warn' | 'error';

/**
 * Example logging transport, replace with something that actually goes to the
 * server
 */
const logToServer = (level: levels, message: string, data: any) => {
  // eslint-disable-next-line no-console
  console[level]({
    data,
    level,
    message,
  });
};

const logLevels = {
  debug: 'debug',
  error: 'error',
  info: 'info',
  log: 'info',
  warn: 'warning',
};

const logger = new Logger(logToServer, logLevels);

export const loggerInstance = logger;

export default logger.getLogger();
