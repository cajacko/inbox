import isTestEnv from 'src/utils/conditionals/isTestEnv';

declare global {
  // tslint:disable-next-line
  interface Window {
    hookTypes?: {
      [key: string]: string;
    };
  }
}

/**
 * Check if a e2e test hook exists. Always returns false in production
 */
const testHookExists = (id: string, type: string) => {
  try {
    if (!isTestEnv()) return false;

    const { hookTypes } = window;

    if (!hookTypes) return false;

    const hook = hookTypes[id];

    if (!hook) return false;

    return hook === type;
  } catch (e) {
    return false;
  }
};

export default testHookExists;
