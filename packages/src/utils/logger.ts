import Logger from 'src/lib/modules/Logger';

function logToServer(level, message, data) {
  console[level]({
    level,
    message,
    data,
  });
}

const logLevels = {
  debug: 'debug',
  log: 'info',
  info: 'info',
  warn: 'warning',
  error: 'error',
};

const logger = new Logger(logToServer, logLevels);

export const loggerInstance = logger;

export default logger.getLogger();
