const waitFor = (
  testFunc: () => Promise<boolean>,
  timeoutErrorMessage: string,
  timeout = 5000
) => {
  const startTime = new Date().getTime();

  const loop = (): Promise<void> => {
    const now = new Date().getTime();

    if (now - startTime > timeout) {
      throw new Error(timeoutErrorMessage);
    }

    return testFunc().then((result) => {
      if (result) return Promise.resolve();

      return new Promise(resolve => setTimeout(resolve, 500)).then(loop);
    });
  };

  return loop();
};

export default waitFor;
