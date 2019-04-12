import getEnvVar from 'src/lib/utils/getEnvVar';

/**
 * Get the current env
 */
const getEnv = () => getEnvVar('ENV');

export default getEnv;
