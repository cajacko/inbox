import isDev from 'src/utils/conditionals/isDev';

/**
 * Are we in a test environment
 */
const isTestEnv = () =>
  isDev() && window.location.href.includes('test-env=true');

export default isTestEnv;
