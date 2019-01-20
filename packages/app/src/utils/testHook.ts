/**
 * Hook to add test functionality in e2e tests. Will always return defaultReturn
 * in prod
 */
const testHook = (id: string, defaultReturn: any, params?: any) =>
  defaultReturn;

export default testHook;
