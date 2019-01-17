declare global {
  // tslint:disable-next-line
  interface Window {
    initialRender: boolean;
    noLoading: boolean;
    startTime: number;
  }
}

/**
 * Control the hiding and showing of the loading screen on web
 */
class SplashScreen {
  /**
   * Hide the splashscreen.
   */
  public static hide() {
    const loadingEl = document.getElementById('loading');

    if (!loadingEl) return;

    window.initialRender = true;

    const now = Math.floor(Date.now());

    if (window.noLoading) {
      loadingEl.remove();
    } else {
      const loadingTime = now - window.startTime;

      // Otherwise looks like flash of content
      const minimumLoadTime = 1000;
      let additionalLoadTime = minimumLoadTime - loadingTime;

      if (additionalLoadTime < 0) {
        additionalLoadTime = 0;
      }

      setTimeout(() => {
        loadingEl.classList.remove('loading');

        loadingEl.addEventListener(
          'transitionend',
          () => {
            loadingEl.remove();
          },
          true
        );
      }, additionalLoadTime);
    }
  }
}

export default SplashScreen;
