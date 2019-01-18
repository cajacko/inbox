import isTestEnv from 'src/utils/conditionals/isTestEnv';

declare global {
  // tslint:disable-next-line
  interface Window {
    hooks?: {
      [key: string]: (params: any) => any;
    };
  }
}

/**
 * Hook to add test functionality in e2e tests. Will always return defaultReturn
 * in prod
 */
const testHook = (id: string, defaultReturn: any, params?: any) => {
  if (!isTestEnv()) return defaultReturn;

  let response = defaultReturn;
  let responseSet = false;

  const { hooks } = window;

  if (!hooks) return defaultReturn;

  const hook = hooks[id];

  if (!hook) return defaultReturn;

  response = hook(params);
  responseSet = true;

  if (responseSet) {
    return response;
  }

  return defaultReturn;
};

export default testHook;
