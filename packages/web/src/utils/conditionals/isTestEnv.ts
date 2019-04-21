import get from 'lodash/get';
import isDev from 'src/utils/conditionals/isDev';

const setItem = get(window, 'localStorage.setItem');
const getItem = get(window, 'localStorage.getItem');
const userAgent = get(window, 'navigator.userAgent');

if (window.location.href.includes('test-env=true') && setItem) {
  setItem('isTestEnv', 'true');
}

/**
 * Are we in a test environment
 */
const isTestEnv = () => {
  if (!isDev()) return false;

  return (
    (getItem && getItem('isTestEnv')) || /\bHeadlessChrome\//.test(userAgent)
  );
};

export default isTestEnv;
