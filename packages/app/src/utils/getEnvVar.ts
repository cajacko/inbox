import Config from 'react-native-config';

/**
 * Get an environmental variable
 */
const getEnvVar = (envVar: string) => Config[envVar];

export default getEnvVar;
