import logConfig from '../config/log';

const logs = {
  AFTER: '\n\n\n-----------BEFORE-----------\n\n\n',
  BEFORE: '\n\n\n-----------BEFORE-----------\n\n\n',
};

const getLogMessage = (key: string, ...args: any[]) => {
  const message = logs[key] || key;

  if (typeof message === 'function') {
    const messageArr = message(...args);

    if (Array.isArray(messageArr)) return messageArr;

    return [messageArr];
  }

  return [message].concat(args);
};

const shouldLog = (key: string) => !!logConfig[key];

const log = (key: string) => (...args: any[]) => {
  if (shouldLog(key)) {
    // eslint-disable-next-line
    console.log(...getLogMessage(key, ...args));
  }
};

export default log;
