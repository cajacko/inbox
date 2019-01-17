import UISplashScreen from 'src/modules/SplashScreen';

let hidden = false;

/**
 * Control the hiding and showing of the splash/loading screen
 */
class SplashScreen {
  /**
   * Hide the splashscreen
   */
  public static hide() {
    if (hidden) return;

    hidden = true;

    UISplashScreen.hide();
  }
}

export default SplashScreen;
