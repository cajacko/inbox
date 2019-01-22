import isDev from 'src/utils/conditionals/isDev';

if (window.location.href.includes('test-env=true')) {
  window.localStorage.setItem('isTestEnv', 'true');
}

/**
 * Are we in a test environment
 */
const isTestEnv = () =>
  isDev() &&
  (window.localStorage.getItem('isTestEnv') === 'true' ||
    /\bHeadlessChrome\//.test(window.navigator.userAgent));

export default isTestEnv;
