type EnvKeys = 'BY_PASS_AUTH';

const env: { [K in EnvKeys]?: any } = {
  // BY_PASS_AUTH: true,
};

/**
 * Get an environmental variable
 */
const getEnvVar = (envVar: EnvKeys) => env[envVar];

export default getEnvVar;
