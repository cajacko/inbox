import { Text } from 'src/lib/types/general';
import getText from 'src/lib/utils/getText';
import PlatformAlert from 'src/modules/Alert';

/**
 * Show an alert modal
 */
class Alert {
  /**
   * Show a confirm modal
   */
  public static confirm(message: Text) {
    const text = getText(message);

    return PlatformAlert.confirm(text);
  }
}

export default Alert;
