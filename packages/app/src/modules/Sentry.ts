import { Sentry as RNSentry, SentrySeverity } from 'react-native-sentry';
import { ISentryMessage } from 'src/lib/types/general';

export { SentrySeverity as LogLevel };

/**
 * The native app sentry module
 */
class Sentry {
  /**
   * Initialise sentry
   */
  public static init(dsn: string) {
    return RNSentry.config(dsn).install();
  }

  /**
   * Send a sentry event
   */
  public static captureEvent(event: ISentryMessage) {
    return RNSentry.captureMessage(event.message, {
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
