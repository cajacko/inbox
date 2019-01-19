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

const browserHooks = (hooks: { [key: string]: string }) => {
  const delay = (milliSeconds: number) =>
    new Promise(resolve => setTimeout(resolve, milliSeconds));

  const crash = (message: string) => () => {
    throw new Error(message);
  };

  // This is where all the browser hook logic lives
  const implementations = {
    root: {
      crash: crash('Root crash'),
    },
    mainRouter: {
      crash: crash('Main router crash'),
    },
    splashScreen: {
      stall: () => ({
        duration: 500,
        delay: () => delay(1500),
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
