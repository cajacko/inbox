/**
 * Allows control of the native keyboard, which we don't have on web so do
 * nothing
 */
class Keyboard {
  /**
   * Hide the keyboard
   */
  public static hide() {
    return Promise.resolve();
  }
}

export default Keyboard;
