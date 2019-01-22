type Func = () => string;

const waitFor = (
  testFunc: () => Promise<boolean>,
  timeoutErrorMessage: string | Func,
  timeout = 5000
) => {
  const startTime = new Date().getTime();

  const loop = (): Promise<void> => {
    const now = new Date().getTime();

    if (now - startTime > timeout) {
      throw new Error(typeof timeoutErrorMessage === 'string'
        ? timeoutErrorMessage
        : timeoutErrorMessage());
    }

    return testFunc()
      .then((result) => {
        if (result) return Promise.resolve();

        return new Promise(resolve => setTimeout(resolve, 500)).then(loop);
      })
      .catch((e) => {
        // eslint-disable-next-line
        console.error(
          'testFunc threw during waitFor, ensure the testFunc resolves with a boolean and only errors if something does go wrong. See below for the error');
        throw e;
      });
  };

  return loop();
};

export default waitFor;
