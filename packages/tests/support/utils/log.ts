import logConfig, { LOG_AS_HAPPENS } from '../config/log';

const logs = {
  // AFTER: '\n\n\n-----------AFTER-----------\n\n\n',
  // BEFORE: '\n\n\n-----------BEFORE-----------\n\n\n',
};

type Args = string[];
let currentLogs: Args[] = [];

const getLogMessage = (key: string, ...args: string[]) => {
  const message = logs[key] || key;

  if (typeof message === 'function') {
    const messageArr = message(...args);

    if (Array.isArray(messageArr)) return messageArr;

    return [messageArr];
  }

  return [message].concat(args);
};

const shouldLog = (key: string) => !!logConfig[key];

const log = (key: string) => (...args: string[]) => {
  if (shouldLog(key)) {
    const logArgs = getLogMessage(key, ...args);

    currentLogs.push(logArgs);

    if (LOG_AS_HAPPENS) {
      // eslint-disable-next-line
      console.log(...logArgs);
    }
  }
};

export const resetLogs = () => {
  currentLogs = [];
};

export const getLogs = () => currentLogs;

export default log;
