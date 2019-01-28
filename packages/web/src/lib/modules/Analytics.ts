import history from 'src/lib/utils/history';
import sentry from 'src/lib/utils/sentry';
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

  /**
   * Initialise the analytics
   */
  public init() {
    PlatformAnalytics.init();

    this.trackScene(history.location.pathname);
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
    sentry.addBreadcrumb({
      data: {
        action,
        category,
        label,
        nonInteraction,
        value,
      },
      message: action,
      timestamp: new Date().getTime(),
      type: 'ANALYTICS_EVENT',
    });

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
    sentry.addBreadcrumb({
      data: {
        scene,
      },
      message: scene,
      timestamp: new Date().getTime(),
      type: 'ANALYTICS_SCENE',
    });

    return PlatformAnalytics.trackScene(scene);
  }
}

export default Analytics;
