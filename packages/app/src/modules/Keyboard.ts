import { Keyboard as RNKeyboard } from 'react-native';

/**
 * Allows control of the native keyboard
 */
class Keyboard {
  /**
   * Hide the keyboard
   */
  public static hide() {
    return Promise.resolve(RNKeyboard.dismiss());
  }
}

export default Keyboard;
