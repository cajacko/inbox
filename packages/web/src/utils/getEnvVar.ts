type EnvKeys =
  | 'API_ENDPOINT'
  | 'BY_PASS_AUTH'
  | 'ENV'
  | 'LOG_REDUX_IN_TESTS'
  | 'DISABLE_SYNC_CRON'
  | 'DISABLE_SENTRY'
  | 'DISABLE_ANALYTICS';

// eslint-disable-next-line no-warning-comments
// Need to define each env as process.env.XXX as webpack replaces this with
// the value
const env = {
  API_ENDPOINT: process.env.API_ENDPOINT,
  BY_PASS_AUTH: process.env.BY_PASS_AUTH,
  DISABLE_ANALYTICS: process.env.DISABLE_ANALYTICS,
  DISABLE_SENTRY: process.env.DISABLE_SENTRY,
  DISABLE_SYNC_CRON: process.env.DISABLE_SYNC_CRON,
  ENV: process.env.ENV,
  LOG_REDUX_IN_TESTS: process.env.LOG_REDUX_IN_TESTS,
};

/**
 * Get an environmental variable
 */
const getEnvVar = (envVar: EnvKeys) => env[envVar];

export default getEnvVar;
