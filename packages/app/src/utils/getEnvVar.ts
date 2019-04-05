import Config from 'react-native-config';

type EnvKeys =
  | 'API_ENDPOINT'
  | 'BY_PASS_AUTH'
  | 'ENV'
  | 'LOG_REDUX_IN_TESTS'
  | 'DISABLE_SYNC_CRON'
  | 'DISABLE_SENTRY'
  | 'DISABLE_ANALYTICS';

/**
 * Get an environmental variable
 */
const getEnvVar = (envVar: EnvKeys) => Config[envVar];

export default getEnvVar;
