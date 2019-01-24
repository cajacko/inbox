import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/lib/components/App';
import 'src/modules/Sentry';
import isTestEnv from 'src/utils/conditionals/isTestEnv';

declare global {
  // tslint:disable-next-line
  interface Window {
    showError: (e?: { title: string; message: string; code: string }) => void;
  }
}

/**
 * If react fails to load, show the error message
 */
const onError = (e?: { title: string; message: string; code: string }) => {
  if (window.showError) window.showError(e);
};

try {
  /**
   * Render the app
   */
  const render = () => {
    ReactDOM.render(<App />, document.getElementById('react') as HTMLElement);
  };

  /**
   * If we are in a test environment then delay rendering the app until the
   * hooks are set, otherwise render straight away
   */
  if (isTestEnv()) {
    /**
     * Keep checking if the hooks have been set yet, they should for every test
     */
    const loop = () => {
      if (window.hooks) {
        try {
          render();
        } catch (e) {
          onError();
        }

        return;
      }

      setTimeout(() => {
        loop();
      }, 100);
    };

    loop();
  } else {
    render();
  }
} catch (e) {
  onError();
}
