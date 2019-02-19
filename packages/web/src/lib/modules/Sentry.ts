import AppError from 'src/lib/modules/AppError';
import {
  IBreadcrumb,
  ISentryMessage,
  LogLevel,
  OnLogType,
} from 'src/lib/types/general';
import history from 'src/lib/utils/history';
import store from 'src/lib/utils/store';
import sentry from 'src/modules/Sentry';
import isDev from 'src/utils/conditionals/isDev';
import isTestEnv from 'src/utils/conditionals/isTestEnv';
import getEnv from 'src/utils/getEnv';
import { version } from '../../../package.json';

/**
 * Expose the sentry api
 */
class Sentry {
  private dsn: string;
  private respondToPromise: (e?: AppError) => void;
  private ready: Promise<void>;
  private breadcrumbs: ISentryMessage['breadcrumbs'];
  private enabled: boolean;

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

    this.enabled = !isDev() && !isTestEnv();
  }

  /**
   * Initialise sentry
   */
  public init(): Promise<any> {
    if (this.enabled) {
      sentry
        .init(this.dsn)
        .then(() => {
          this.respondToPromise();
        })
        .catch((e: AppError) => {
          this.respondToPromise(e);
        });
    } else {
      this.respondToPromise();
    }

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
    const route = history.location.pathname;

    const finalTags: ISentryMessage['tags'] = { route, version, ...tags };

    if (errorCode) finalTags.errorCode = errorCode;
    if (userId) finalTags.userId = userId;

    if (!this.enabled) return;

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
