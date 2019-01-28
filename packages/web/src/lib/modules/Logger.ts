/* eslint no-console: 0 no-global-assign: 0 */

import {
  ILoggerInstance,
  ISentryMessage,
  LogLevel,
  OnLogType,
} from 'src/lib/types/general';

const mapLogLevelToConsole = {
  [LogLevel.Critical]: 'error',
  [LogLevel.Debug]: 'debug',
  [LogLevel.Error]: 'error',
  [LogLevel.Fatal]: 'error',
  [LogLevel.Info]: 'info',
  [LogLevel.Log]: 'info',
  [LogLevel.Warning]: 'warn',
};

/**
 * When we are not in development, catch every console statement and send it
 * to our log server. Making sure to still show the log in the console.
 */
class Logger {
  /**
   * Initialise the logger
   */
  constructor(onLog?: OnLogType | OnLogType[], shouldWrapConsole?: boolean) {
    this.consoleLogLevels = {
      error: LogLevel.Error,
      info: LogLevel.Info,
      log: LogLevel.Info,
      warn: LogLevel.Warning,
    };

    if (onLog) {
      if (Array.isArray(onLog)) {
        this.onLog = onLog;
      } else {
        this.onLog = [onLog];
      }
    } else {
      this.onLog = [this.onLogDefault];
    }

    if (shouldWrapConsole) this.wrapConsole();

    this.setLogger();
  }

  private consoleLogLevels: { [key: string]: LogLevel };
  private logger: ILoggerInstance;
  private onLog: OnLogType[];

  /**
   *  Default log function
   */
  private onLogDefault(
    level: LogLevel,
    message: string,
    data?: any,
    tags?: ISentryMessage['tags'],
    isConsoleWrap?: boolean
  ) {
    if (isConsoleWrap) return;

    /**
     * Does the log level have a console function
     */
    const isConsole = (key: string) => this.consoleLogLevels[key] === level;

    const consoleFuncName = Object.keys(this.consoleLogLevels).find(isConsole);

    const consoleFunc = consoleFuncName
      ? // eslint-disable-next-line no-console
      console[consoleFuncName]
      : // eslint-disable-next-line no-console
      console.log;

    consoleFunc(message, data);
  }

  /**
   * Set the logger object that we will eventually return to be used within
   * our app
   */
  private setLogger() {
    // @ts-ignore
    this.logger = Object.keys(mapLogLevelToConsole).reduce(
      (logger, logLevel) =>
        Object.assign(logger, {
          [logLevel]: (
            message: string,
            data?: any,
            tags?: ISentryMessage['tags']
          ) => {
            this.onLog.forEach((onLog) => {
              onLog(mapLogLevelToConsole[logLevel], message, data, tags, false);
            });
          },
        }),
      {}
    );
  }

  /**
   * Return the logger object
   */
  public getLogger() {
    return this.logger;
  }

  /**
   * Wrap the console object and send all the logs through our onLog function.
   * Currently only works in browsers.
   */
  private wrapConsole() {
    // Store a ref to the original console object
    const actualConsole = console;

    // Set the console object as blank object, we'll add the functionality
    // back in
    // @ts-ignore: We are hacking this
    console = {};

    // Add back all the props/values to the console object, but for the
    // functions, send the log to our server as well.
    Object.keys(actualConsole).forEach((method) => {
      // Only need to wrap the functions
      if (typeof actualConsole[method] === 'function') {
        // Set the wrapper, which pings our log server
        console[method] = (...args: any) => {
          // Only ping our log server for the functions we've mapped out a log
          // level for
          if (this.consoleLogLevels[method]) {
            this.onLog.forEach((onLog) => {
              onLog(
                mapLogLevelToConsole[method],
                typeof args[0] === 'string' ? args[0] : method,
                args,
                {
                  isFromConsoleWrap: 'true',
                },
                true
              );
            });
          }

          // Perform the original console function, so it appears in the
          // console
          actualConsole[method](...args);
        };
      } else {
        // Not concerned with this, so put it back as usual
        console[method] = actualConsole[method];
      }
    });
  }
}

export default Logger;
