import Config from 'react-native-config';

type EnvKeys = 'API_ENDPOINT' | 'BY_PASS_AUTH';

/**
 * Get an environmental variable
 */
const getEnvVar = (envVar: EnvKeys) => Config[envVar];

export default getEnvVar;
