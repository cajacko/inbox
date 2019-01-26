import ReactGA from 'react-ga';

/**
 * Track web analytics
 */
class Analytics {
  /**
   * Initialise the analytics
   */
  public static init() {
    ReactGA.initialize('UA-133191209-1', {
      // debug: true,
      // testMode: true,
    });
  }

  /**
   * Unset the user, normally because they logged out
   */
  public static unsetUser() {
    ReactGA.set({
      userId: null,
    });
  }

  /**
   * Set the user details
   */
  public static setUserProps(props: { userId: string; [key: string]: string }) {
    ReactGA.set(props);
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
    const event = {
      action,
      category,
      label,
      nonInteraction,
      value,
    };

    ReactGA.event(event);
  }

  /**
   * Track a scene change
   */
  public static trackScene(scene: string) {
    ReactGA.pageview(scene);
  }
}

export default Analytics;
