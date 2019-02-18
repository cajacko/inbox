import { HookScenarioResult, setDefinitionFunctionWrapper } from 'cucumber';

type OnErrorCallback = (
  testCase: HookScenarioResult,
  e: Error
) => Promise<Error> | Error;
type OnSuccessCallback = (testCase: HookScenarioResult, val: any) => any;
type AfterCallback = (testCase: HookScenarioResult) => any;
type BeforeCallback = (testCase: HookScenarioResult) => any;

const onErrorCallbacks: OnErrorCallback[] = [];
const onSuccessCallbacks: OnSuccessCallback[] = [];
const afterCallbacks: AfterCallback[] = [];
const beforeCallbacks: BeforeCallback[] = [];

// @ts-ignore
setDefinitionFunctionWrapper((func, opts) => {
  // Don't wrap if specifically ignored
  if (opts && opts.ignoreStepHooks) return func;

  // @ts-ignore
  return function (...args) {
    // This means it's a hook, return the original func
    // @ts-ignore
    if (args[0] && args[0].sourceLocation) return func.apply(this, args);

    // @ts-ignore
    const { testCase }: HookScenarioResult = this;

    let error: Error | undefined;

    return Promise.all(beforeCallbacks.map(callback => callback(testCase)))
      .then(() =>
        // @ts-ignore
        Promise.resolve(func.apply(this, args))
          .then((val) => {
            const promises = onSuccessCallbacks.map(callback =>
              callback(testCase, val));

            return Promise.all(promises).then(() => val);
          })
          .catch((e: Error) => {
            const loop = (i: number) => (newError: Error): Promise<Error> => {
              const next = onErrorCallbacks[i];

              if (!next) return Promise.resolve(newError);

              return Promise.resolve(next(testCase, newError)).then(loop(i + 1));
            };

            return loop(0)(e).then((newError) => {
              error = newError;
            });
          }))
      .then(() =>
        Promise.all(afterCallbacks.map(callback => callback(testCase))))
      .then(() => {
        if (error) throw error;
      });
  };
});

export const OnError = (func: OnErrorCallback) => {
  onErrorCallbacks.push(func);
};

export const OnSuccess = (func: (val: any) => any) => {
  onSuccessCallbacks.push(func);
};

export const AfterStep = (func: () => any) => {
  afterCallbacks.push(func);
};

export const BeforeStep = (func: () => any) => {
  beforeCallbacks.push(func);
};
