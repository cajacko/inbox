import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'src/lib/components/App';
import isTestEnv from 'src/utils/conditionals/isTestEnv';

const reactEl = document.getElementById('react');

/**
 * If react fails to load, show the error message
 */
const onError = () => {
  if (reactEl) reactEl.remove();

  const errorEl = document.getElementById('error');

  if (errorEl) errorEl.style.opacity = '1';

  const loadingEl = document.getElementById('loading');
  if (loadingEl) loadingEl.remove();
};

try {
  /**
   * Render the app
   */
  const render = () => {
    ReactDOM.render(<App />, reactEl as HTMLElement);
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
