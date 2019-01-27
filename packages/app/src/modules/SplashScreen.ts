import RNSplashScreen from 'react-native-splash-screen';

/**
 * Control the hiding and showing of the splash screen on native
 */
class SplashScreen {
  /**
   * Hide the splash screen.
   */
  public static hide() {
    RNSplashScreen.hide();
  }
}

export default SplashScreen;
