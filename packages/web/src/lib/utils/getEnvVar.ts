import platformGetEnvVar from 'src/utils/getEnvVar';

export type EnvKeys =
  | 'API_ENDPOINT'
  | 'BY_PASS_AUTH'
  | 'ENV'
  | 'LOG_REDUX_IN_TESTS'
  | 'DISABLE_SYNC_CRON'
  | 'DISABLE_SENTRY'
  | 'DISABLE_ANALYTICS';

/**
 * Get the env var, and ensure it's type
 */
const getEnvVar = (key: EnvKeys) => {
  const val = platformGetEnvVar(key);

  if (val === 'true') return true;
  if (val === 'false') return false;

  return val;
};

export default getEnvVar;
