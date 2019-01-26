import firebase from 'react-native-firebase';

const analytics = firebase.analytics();

/**
 * Track web analytics
 */
class Analytics {
  /**
   * Initialise the analytics
   */
  public static init() {}

  /**
   * Unset the user, normally because they logged out
   */
  public static unsetUser() {
    // Not sure what we can do here
  }

  /**
   * Set the user details
   */
  public static setUserProps({
    userId,
    ...props
  }: {
    userId: string;
    [key: string]: string;
    }) {
    analytics.setUserId(userId);

    if (Object.keys(props).length) {
      analytics.setUserProperties(props);
    }
  }

  /**
   * Track an event
   */
  public static trackEvent(
    action: string,
    category: string,
    label?: string,
    value?: number,
    nonInteraction?: boolean
  ) {
    analytics.logEvent(action, {
      category,
      label,
      nonInteraction,
      value,
    });
  }

  /**
   * Track a scene change
   */
  public static trackScene(scene: string) {
    analytics.setCurrentScreen(scene);
  }
}

export default Analytics;
