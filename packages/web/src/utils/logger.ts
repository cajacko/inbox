/* eslint no-console: 0 */
import Logger, { LogLevel } from 'src/lib/modules/Logger';
import { ISentryMessage } from 'src/lib/modules/Sentry';
import sentry from 'src/lib/utils/sentry';
import isDev from 'src/utils/conditionals/isDev';

/**
 * Example logging transport, replace with something that actually goes to the
 * server
 */
const logToServer = (
  level: LogLevel,
  message: string,
  data: any,
  tags: ISentryMessage['tags'],
  isFromConsoleWrap: boolean
) => {
  if (!isDev()) return;
  if (isFromConsoleWrap) return;

  let color = 'black';

  switch (level) {
    case 'error':
      color = 'red';
      break;
    case 'warning':
      color = 'yellow';
      break;
    default:
      break;
  }

  console.groupCollapsed(`%c${message}`, `color: ${color};`);
  console.debug(`Level: ${level}`);

  if (data !== undefined) {
    console.group('Data');
    console.debug(data);
    console.groupEnd();
  } else {
    console.debug('Data: undefined');
  }

  console.groupEnd();
};

const logger = new Logger([logToServer, sentry.getLoggerTransport()], true);

export const loggerInstance = logger;

export default logger.getLogger();
