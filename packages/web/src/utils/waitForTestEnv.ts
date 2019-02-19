import isTestEnv from 'src/utils/conditionals/isTestEnv';

declare global {
  // tslint:disable-next-line
  interface Window {
    hooks?: {
      [key: string]: (params: any) => any;
    };
  }
}

const promise = new Promise((resolve) => {
  if (!isTestEnv()) {
    resolve();
    return;
  }

  /**
   * Check if the hooks are set
   */
  const test = () => !!window.hooks;

  if (test()) {
    resolve();
  } else {
    const interval = setInterval(() => {
      if (test()) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  }
});

/**
 * Return the promise to wait for the test env to be ready
 */
const waitForTestEnv = () => promise;

export default waitForTestEnv;
