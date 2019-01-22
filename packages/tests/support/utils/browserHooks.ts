declare global {
  // tslint:disable-next-line
  interface Window {
    hooks?: {
      [key: string]: (params: any) => any;
    };

    hookTypes?: {
      [key: string]: string;
    };
  }
}

const browserHooks = (
  hooks: { [key: string]: string },
  constants: { [key: string]: any }
) => {
  const delay = (milliSeconds: number) =>
    new Promise(resolve => setTimeout(resolve, milliSeconds));

  const crash = (message: string) => () => {
    throw new Error(message);
  };

  // This is where all the browser hook logic lives
  const implementations = {
    login: {
      delay: () => ({
        delay: () => delay(500),
        method: 'signInWithEmailAndPassword',
        params: [
          constants.loginDetails.success.email,
          constants.loginDetails.success.password,
        ],
      }),
      googleFailed: () => ({
        delay: () => Promise.resolve(),
        method: 'signInWithEmailAndPassword',
        params: [
          constants.loginDetails.error.email,
          constants.loginDetails.error.password,
        ],
      }),
      success: () => ({
        delay: () => Promise.resolve(),
        method: 'signInWithEmailAndPassword',
        params: [
          constants.loginDetails.success.email,
          constants.loginDetails.success.password,
        ],
      }),
    },
    mainRouter: {
      crash: crash('Main router crash'),
    },
    root: {
      crash: crash('Root crash'),
    },
    splashScreen: {
      error: crash('Splash screen error'),
      stall: () => ({
        delay: () => delay(1500),
        duration: 500,
      }),
    },
  };

  window.hooks = {};
  window.hookTypes = {};

  if (!hooks) return;

  Object.keys(hooks).forEach((hook) => {
    const type = hooks[hook];

    if (!window.hooks) window.hooks = {};
    if (!window.hookTypes) window.hookTypes = {};

    window.hookTypes[hook] = type;

    const implementation = implementations[hook] && implementations[hook][type];

    if (implementation) {
      window.hooks[hook] = implementation;
    }
  });
};

export default browserHooks;
