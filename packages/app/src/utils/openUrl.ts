import { Linking } from 'react-native';
import AppError from 'src/lib/modules/AppError';

/**
 * Open a link in react native
 */
const openUrl = (url: string) => () =>
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      return Linking.openURL(url);
    }

    throw new AppError(`Don't know how to open URI: ${url}`, '100-022');
  });

export default openUrl;
