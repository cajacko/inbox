// @flow

type OnLogType = (
  level: string,
  message: string,
  data?: ?any,
  isConsoleWrap: boolean
) => void;

interface LogLevelsType { [key: string]: string }

export type LoggerInstance = {
  [key: string]: (string, ...params: any) => void,
};
/**
 * When we are not in development, catch every console statement and send it
 * to our log server. Making sure to still show the log in the console.
 */
class Logger {
  /**
   * Initialise the logger
   */
  constructor(
    onLog?: ?OnLogType,
    logLevels?: ?LogLevelsType,
    shouldWrapConsole?: boolean
  ) {
    this.consoleLogLevels = {
      log: 'info',
      info: 'info',
      warn: 'warning',
      error: 'error',
    };

    this.onLog = onLog || this.onLogDefault;

    this.logLevels = logLevels || Object.assign({}, this.consoleLogLevels);

    if (shouldWrapConsole) this.wrapConsole();

    this.setLogger();
  }

  consoleLogLevels: { [key: string]: string };
  logger: LoggerInstance;
  logLevels: LogLevelsType;
  onLog: OnLogType;

  /**
   *  Default log function
   *
   * @param {String} level The log level
   * @param {String} message The log message
   * @param {Any} data Data that was passed with the log
   * @param {Boolean} isConsoleWrap Did this log come from the console
   *  wrapper
   *
   * @return {Void} No return value
   */
  onLogDefault(
    level: string,
    message: string,
    data?: ?any,
    isConsoleWrap?: ?boolean
  ) {
    if (isConsoleWrap) return;

    /**
     * Does the log level have a console function
     *
     * @param {String} key The console log func name
     *
     * @return {Boolean} Whether the log level has a console counterpart
     */
    const isConsole = key => this.consoleLogLevels[key] === level;

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
   *
   * @return {Void} No Return value
   */
  setLogger() {
    this.logger = Object.keys(this.logLevels).reduce(
      (logger, logLevel) =>
        Object.assign(logger, {
          [logLevel]: (message, data) =>
            this.onLog(this.logLevels[logLevel], message, data, false),
        }),
      {}
    );
  }

  /**
   * Return the logger object
   *
   * @return {Object} The logger object, to be used instead of console
   */
  getLogger() {
    return this.logger;
  }

  /**
   * Wrap the console object and send all the logs through our onLog function.
   * Currently only works in browsers.
   *
   * @return {Void} No return value
   */
  wrapConsole() {
    if (window && window.console) {
      // Store a ref to the original console object
      const actualConsole = window.console;

      // Set the console object as blank object, we'll add the functionality
      // back in
      window.console = {};

      // Add back all the props/values to the console object, but for the
      // functions, send the log to our server as well.
      Object.keys(actualConsole).forEach((m) => {
        // Only need to wrap the functions
        if (typeof actualConsole[m] === 'function') {
          // Set the wrapper, which pings our log server
          window.console[m] = (...args) => {
            // Only ping our log server for the functions we've mapped out a log
            // level for
            if (this.consoleLogLevels[m]) {
              this.onLog(
                this.consoleLogLevels[m],
                typeof args[0] === 'string' ? args[0] : m,
                args,
                true
              );
            }

            // Perform the original console function, so it appears in the
            // console
            actualConsole[m](...args);
          };
        } else {
          // Not concerned with this, so put it back as usual
          window.console[m] = actualConsole[m];
        }
      });
    }
  }
}

export default Logger;
