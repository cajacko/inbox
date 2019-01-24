import AppError from 'src/lib/modules/AppError';
import { LogLevel, OnLogType } from 'src/lib/modules/Logger';
import store from 'src/lib/utils/store';
import sentry from 'src/modules/Sentry';
import isDev from 'src/utils/conditionals/isDev';
import isTestEnv from 'src/utils/conditionals/isTestEnv';
import getEnv from 'src/utils/getEnv';
import { version } from '../../../package.json';

interface IBreadcrumb {
  type: string;
  message: string;
  data?: any;
  timestamp: number;
}

export interface ISentryMessage {
  level: LogLevel;
  message: string;
  timestamp: number;
  route: string;
  data?: any;
  userId?: string;
  breadcrumbs: IBreadcrumb[];
  version: string;
  env: string;
  tags: {
    [key: string]: string;
  };
}

/**
 * Expose the sentry api
 */
class Sentry {
  private dsn: string;
  private respondToPromise: (e?: AppError) => void;
  private ready: Promise<void>;
  private breadcrumbs: ISentryMessage['breadcrumbs'];

  /**
   * Set the dsn
   */
  constructor(dsn: string) {
    this.dsn = dsn;

    this.ready = new Promise((resolve, reject) => {
      this.respondToPromise = (e?: AppError) => {
        if (e) {
          reject(e);
        } else {
          resolve(e);
        }
      };
    });

    this.breadcrumbs = [];
  }

  /**
   * Initialise sentry
   */
  public init(): Promise<any> {
    sentry
      .init(this.dsn)
      .then(() => {
        this.respondToPromise();
      })
      .catch((e: AppError) => {
        this.respondToPromise(e);
      });

    return this.ready;
  }

  /**
   * Add a breadcrumb to the stack
   */
  public addBreadcrumb(breadcrumb: IBreadcrumb) {
    this.breadcrumbs.push(breadcrumb);
  }

  /**
   * Clear the breadcrumb stack
   */
  public clearBreadcrumbs() {
    this.breadcrumbs = [];
  }

  /**
   * Capture an exception
   */
  public captureEvent(
    level: LogLevel,
    message: string,
    data?: any,
    tags?: ISentryMessage['tags']
  ) {
    let userId;
    let errorCode;

    try {
      const state = store.getJSState();

      userId = state.user.id || undefined;
    } catch (e) {
      userId = undefined;
    }

    try {
      if (data && data.errorObject && data.errorObject.code) {
        errorCode = data.errorObject.code || undefined;
      }
    } catch (e) {
      errorCode = undefined;
    }

    const env = getEnv();
    const route = '/';

    const finalTags: ISentryMessage['tags'] = { route, version, ...tags };

    if (errorCode) finalTags.errorCode = errorCode;
    if (userId) finalTags.userId = userId;

    console.debug({
      env,
      errorCode,
      route,
      userId,
    });

    if (isDev() || isTestEnv()) return;

    sentry.captureEvent({
      breadcrumbs: this.breadcrumbs,
      data,
      env,
      level,
      message,
      route,
      tags: finalTags,
      timestamp: new Date().getTime(),
      userId,
      version,
    });
  }

  /**
   * Get the logger transport that gets passed to the logger instance
   */
  public getLoggerTransport(): OnLogType {
    return (level, message, data, tags) => {
      if (level === LogLevel.Debug) return;

      this.captureEvent(level, message, data, tags);
    };
  }
}

export default Sentry;
