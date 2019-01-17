/* eslint no-console: 0 */
import Logger from 'src/lib/modules/Logger';

type levels = 'debug' | 'info' | 'log' | 'warn' | 'error';

/**
 * Example logging transport, replace with something that actually goes to the
 * server
 */
const logToServer = (
  level: levels,
  message: string,
  data: any,
  isFromConsoleWrap: boolean
) => {
  if (isFromConsoleWrap) return;

  let color = 'black';

  switch (level) {
    case 'error':
      color = 'red';
      break;
    case 'warn':
      color = 'yellow';
      break;
    default:
      break;
  }

  console.groupCollapsed(`%c${message}`, `color: ${color};`);
  console.log(`Level: ${level}`);

  if (data !== undefined) {
    console.group('Data');
    console.log(data);
    console.groupEnd();
  } else {
    console.log('Data: undefined');
  }

  console.groupEnd();
};

const logLevels = {
  debug: 'debug',
  error: 'error',
  info: 'info',
  log: 'info',
  warn: 'warning',
};

const logger = new Logger(logToServer, logLevels, true);

export const loggerInstance = logger;

export default logger.getLogger();
