import { Alert as RNAlert } from 'react-native';
import getText from 'src/lib/utils/getText';

/**
 * Show an alert modal
 */
class Alert {
  /**
   * Show a confirm modal
   */
  public static confirm(message: string) {
    return new Promise((resolve, reject) => {
      try {
        RNAlert.alert(
          message,
          undefined,
          [
            {
              onPress: () => resolve(false),
              style: 'cancel',
              text: getText('Logout.Cancel'),
            },
            {
              onPress: () => resolve(true),
              style: 'default',
              text: getText('Logout.Ok'),
            },
          ],
          {
            onDismiss: () => resolve(false),
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default Alert;
