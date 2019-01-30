/**
 * Show an alert modal
 */
class Alert {
  /**
   * Show a confirm modal
   */
  public static confirm(message: string) {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-alert
      const confirmed = window.confirm(message);

      resolve(confirmed);
    });
  }
}

export default Alert;
