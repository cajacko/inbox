import logHOC from '../utils/log';

const log = logHOC('WAIT_FOR');

type Func = () => string;

const waitFor = (
  testFunc: () => Promise<boolean>,
  timeoutErrorMessage: string | Func,
  timeout = 5000
) => {
  log('waitFor -> init');

  const startTime = new Date().getTime();

  const loop = (): Promise<void> => {
    log('waitFor -> loop');
    const now = new Date().getTime();

    if (now - startTime > timeout) {
      log('waitFor -> loop -> timeout');
      const error = new Error(typeof timeoutErrorMessage === 'string'
        ? timeoutErrorMessage
        : timeoutErrorMessage());

      // @ts-ignore
      error.timeout = true;

      return Promise.reject(error);
    }

    log('waitFor -> loop -> testFunc');

    return testFunc().then((result) => {
      log('waitFor -> loop -> testFunc -> resolve');
      log(result);

      if (result) return Promise.resolve();

      log('waitFor -> loop -> testFunc -> runAfterTimeout');

      return new Promise(resolve => setTimeout(resolve, 500)).then(loop);
    });
  };

  return loop().catch((e) => {
    if (e.timeout) {
      log('waitFor -> loop -> testFunc -> reject -> timeout');
      throw e;
    }

    log('waitFor -> loop -> testFunc -> reject');
    log(e);
    throw e;
  });
};

export default waitFor;
