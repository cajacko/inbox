declare global {
  // tslint:disable-next-line
  interface Window {
    hooks?: {
      [key: string]: (params: any) => any;
    };
  }
}

const browserHooks = (hooks: { [key: string]: string }) => {
  // @ts-ignore
  const crash = message => () => {
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
  };

  window.hooks = {};

  if (!hooks) return;

  Object.keys(hooks).forEach((hook) => {
    const type = hooks[hook];

    if (!window.hooks) window.hooks = {};

    const implementation = implementations[hook] && implementations[hook][type];

    if (implementation) {
      window.hooks[hook] = implementation;
    }
  });
};

export default browserHooks;
