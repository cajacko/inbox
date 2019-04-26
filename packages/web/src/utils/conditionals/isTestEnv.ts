import isDev from 'src/utils/conditionals/isDev';

if (
  window.location.href.includes('test-env=true') &&
  window.localStorage.setItem
) {
  window.localStorage.setItem('isTestEnv', 'true');
}

/**
 * Are we in a test environment
 */
const isTestEnv = () => {
  if (!isDev()) return false;

  return (
    window.localStorage.getItem('isTestEnv') ||
    /\bHeadlessChrome\//.test(window.navigator.userAgent)
  );
};

export default isTestEnv;
