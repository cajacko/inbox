import CustomDate from 'src/lib/modules/CustomDate';
import Sentry from 'src/lib/modules/Sentry';
import getEnvVar from 'src/lib/utils/getEnvVar';
import history from 'src/lib/utils/history';
import PlatformAnalytics from 'src/modules/Analytics';
import isDev from 'src/utils/conditionals/isDev';
import isTestEnv from 'src/utils/conditionals/isTestEnv';

interface IUserProps {
  userId: string;
  [key: string]: string;
}

/**
 * Log analytics events
 */
class Analytics {
  private isUserSet: boolean = false;
  private sentry?: Sentry;
  private enabled: boolean;

  /**
   * Figure out if analytics is enabled or not
   */
  constructor() {
    const disabled = getEnvVar('DISABLE_SENTRY');
    this.enabled = !disabled && !isDev() && !isTestEnv();
  }

  /**
   * Initialise the analytics
   */
  public init() {
    if (!this.enabled) return;

    PlatformAnalytics.init();

    this.trackScene(history.location.pathname);
  }

  /**
   * Set the sentry instance to use
   */
  public setSentry(sentry: Sentry) {
    this.sentry = sentry;
  }

  /**
   * Only set the user props if they have not been set already
   */
  public setUserIfNotSet(props: IUserProps) {
    if (this.isUserSet) return false;

    this.setUserProps(props);

    return true;
  }

  /**
   * Unset the user
   */
  public unsetUser() {
    if (!this.enabled) return Promise.resolve();

    return PlatformAnalytics.unsetUser();
  }

  /**
   * Set the user props
   */
  public setUserProps(props: IUserProps) {
    if (!this.enabled) return Promise.resolve();

    this.isUserSet = true;

    return PlatformAnalytics.setUserProps(props);
  }

  /**
   * Track an event
   */
  public trackEvent(
    action: string,
    category: string,
    label?: string,
    value?: number,
    nonInteraction?: boolean
  ) {
    if (this.sentry) {
      this.sentry.addBreadcrumb({
        data: {
          action,
          category,
          label,
          nonInteraction,
          value,
        },
        message: action,
        timestamp: CustomDate.now(),
        type: 'ANALYTICS_EVENT',
      });
    }

    if (!this.enabled) return Promise.resolve();

    return PlatformAnalytics.trackEvent(
      action,
      category,
      label,
      value,
      nonInteraction
    );
  }

  /**
   * Track a scene change
   */
  public trackScene(scene: string) {
    if (this.sentry) {
      this.sentry.addBreadcrumb({
        data: {
          scene,
        },
        message: scene,
        timestamp: CustomDate.now(),
        type: 'ANALYTICS_SCENE',
      });
    }

    if (!this.enabled) return Promise.resolve();

    return PlatformAnalytics.trackScene(scene);
  }
}

export default Analytics;
