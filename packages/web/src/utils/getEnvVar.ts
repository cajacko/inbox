type EnvKeys = 'API_ENDPOINT' | 'BY_PASS_AUTH';

const env = {
  API_ENDPOINT: process.env.API_ENDPOINT,
  BY_PASS_AUTH: process.env.BY_PASS_AUTH,
};

/**
 * Get an environmental variable
 */
const getEnvVar = (envVar: EnvKeys) => env[envVar];

export default getEnvVar;
