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
  window.hooks = {};
  window.hookTypes = {};

  const delay = (milliSeconds: number) =>
    new Promise(resolve => setTimeout(resolve, milliSeconds));

  const crash = (message: string) => () => {
    throw new Error(message);
  };

  const reject = (message: string) => () => Promise.reject(new Error(message));

  const getUser = () => {
    const type = hooks && hooks.setUser;

    if (!type) return constants.loginDetails;

    return constants.loginDetails[type] || constants.loginDetails;
  };

  // This is where all the browser hook logic lives
  const implementations = {
    getUser: {
      error: reject('No user'),
    },
    initialState: {
      initialState: constants.initialState
        ? () => constants.initialState
        : undefined,
    },
    login: {
      delay: () => ({
        delay: () => delay(500),
        method: 'signInWithEmailAndPassword',
        params: [getUser().success.email, getUser().success.password],
      }),
      googleFailed: () => ({
        delay: () => Promise.resolve(),
        method: 'signInWithEmailAndPassword',
        params: [getUser().error.email, getUser().error.password],
      }),
      success: () => ({
        delay: () => Promise.resolve(),
        method: 'signInWithEmailAndPassword',
        params: [getUser().success.email, getUser().success.password],
      }),
    },
    mainRouter: {
      crash: crash('Main router crash'),
    },
    newReminder: {
      newReminder: () => ({
        dateCreated: 1549898515336,
        dateModified: 1549898515336,
        dueDate: 1549898515336,
        id: 'new',
      }),
    },
    now: {
      plus2Days: () => {
        const now = new Date();
        now.setDate(now.getDate() + 2);
        return now.getTime();
      },
    },
    refreshIdToken: {
      error: reject('No refreshIdToken'),
    },
    root: {
      crash: crash('Root crash'),
    },
    snoozeCronInterval: {
      short: () => 1000,
    },
    splashScreen: {
      error: crash('Splash screen error'),
      stall: () => ({
        delay: () => delay(1500),
        duration: 500,
      }),
    },
    sync: {
      delay: () => () => delay(15000),
      error: () => () => Promise.reject(new Error('Bad bad')),
      minorDelay: () => () => delay(1000),
    },
    syncCronInterval: {
      short: () => 1000,
    },
  };

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
