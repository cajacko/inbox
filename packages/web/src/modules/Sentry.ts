import { captureEvent, init, Severity } from '@sentry/browser';
import { ISentryMessage } from 'src/lib/modules/Sentry';

export { Severity as LogLevel };

/**
 * The native app sentry module
 */
class Sentry {
  /**
   * Initialise sentry
   */
  public static init(dsn: string) {
    return new Promise((resolve, reject) => {
      try {
        Promise.resolve(init({
          dsn,
        }))
          .then(() => resolve())
          .catch(reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Send a sentry event
   */
  public static captureEvent(event: ISentryMessage) {
    return captureEvent({
      breadcrumbs: event.breadcrumbs,
      environment: event.env,
      extra: {
        data: event.data,
        route: event.route,
        version: event.version,
      },
      level: event.level,
      message: event.message,
      tags: event.tags,
      timestamp: event.timestamp,
      user: {
        id: event.userId,
      },
    });
  }
}

export default Sentry;
