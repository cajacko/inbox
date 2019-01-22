/* eslint no-console: 0 no-global-assign: 0 */
type OnLogType = (
  level: string,
  message: string,
  data?: any,
  isFromConsoleWrap?: boolean
) => void;

interface ILogLevelsType {
  [key: string]: string;
}

export interface ILoggerInstance {
  [key: string]: (arg0: string, ...params: any) => void;
}

/**
 * When we are not in development, catch every console statement and send it
 * to our log server. Making sure to still show the log in the console.
 */
class Logger {
  /**
   * Initialise the logger
   */
  constructor(
    onLog?: OnLogType,
    logLevels?: ILogLevelsType,
    shouldWrapConsole?: boolean
  ) {
    this.consoleLogLevels = {
      error: 'error',
      info: 'info',
      log: 'info',
      warn: 'warning',
    };

    this.onLog = onLog || this.onLogDefault;

    this.logLevels = logLevels || Object.assign({}, this.consoleLogLevels);

    if (shouldWrapConsole) this.wrapConsole();

    this.setLogger();
  }

  private consoleLogLevels: { [key: string]: string };
  private logger: ILoggerInstance;
  private logLevels: ILogLevelsType;
  private onLog: OnLogType;

  /**
   *  Default log function
   */
  private onLogDefault(
    level: string,
    message: string,
    data?: any,
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
    this.logger = Object.keys(this.logLevels).reduce(
      (logger, logLevel) =>
        Object.assign(logger, {
          [logLevel]: (message: string, data?: any) =>
            this.onLog(this.logLevels[logLevel], message, data, false),
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
            this.onLog(
              this.consoleLogLevels[method],
              typeof args[0] === 'string' ? args[0] : method,
              args,
              true
            );
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
