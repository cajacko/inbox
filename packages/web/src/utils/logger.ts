/* eslint no-console: 0 */
import Logger from 'src/lib/modules/Logger';
import { ISentryMessage, LogLevel } from 'src/lib/types/general';
import sentry from 'src/lib/utils/sentry';
import isDev from 'src/utils/conditionals/isDev';
import isTestEnv from 'src/utils/conditionals/isTestEnv';

declare global {
  // tslint:disable-next-line
  interface Window {
    logs: Array<{
      data: any;
      isFromConsoleWrap: boolean;
      level: LogLevel;
      message: string;
      tags: ISentryMessage['tags'];
    }>;
  }
}

window.logs = [];

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
  if (isTestEnv()) {
    window.logs.push({
      data,
      isFromConsoleWrap,
      level,
      message,
      tags,
    });
  }

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
