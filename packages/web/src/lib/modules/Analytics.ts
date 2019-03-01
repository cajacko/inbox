import CustomDate from 'src/lib/modules/CustomDate';
import Sentry from 'src/lib/modules/Sentry';
import history from 'src/lib/utils/history';
import PlatformAnalytics from 'src/modules/Analytics';

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

  /**
   * Initialise the analytics
   */
  public init() {
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
    return PlatformAnalytics.unsetUser();
  }

  /**
   * Set the user props
   */
  public setUserProps(props: IUserProps) {
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

    return PlatformAnalytics.trackScene(scene);
  }
}

export default Analytics;
