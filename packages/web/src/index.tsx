import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/lib/components/App';
import 'src/modules/Sentry';
import isTestEnv from 'src/utils/conditionals/isTestEnv';
import 'src/utils/onBeforeUnload';
import 'src/utils/setTestHooks';
import waitForTestEnv from 'src/utils/waitForTestEnv';

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
    /**
     * The actual render
     */
    const actual = () => {
      ReactDOM.render(<App />, document.getElementById('react') as HTMLElement);
    };

    if (isTestEnv()) {
      return waitForTestEnv().then(() => {
        actual();
      });
    }

    return Promise.resolve(actual());
  };

  /**
   * If we are in a test environment then delay rendering the app until the
   * hooks are set, otherwise render straight away
   */
  if (isTestEnv()) {
    const spinner = document.getElementById('spinner');

    if (spinner) {
      const className = spinner.getAttribute('class');

      if (className) {
        spinner.setAttribute('class', className.replace('is-animating', ''));
      }
    }

    /**
     * Keep checking if the hooks have been set yet, they should for every test
     */
    const loop = () => {
      if (window.hooks) {
        try {
          render().catch(() => onError());
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
    render().catch(() => onError());
  }
} catch (e) {
  onError();
}
