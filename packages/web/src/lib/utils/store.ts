import blacklist from 'src/lib/config/storeBlacklist';
import Store from 'src/lib/modules/Store';
import reducers, { transforms } from 'src/lib/store/reducers';
import analytics from 'src/lib/utils/analytics';
import appLoading from 'src/lib/utils/appLoading';
import analyticsMiddleWare from 'src/lib/utils/middleware/analytics';
import {
  middleware as logoutMiddleware,
  rootReducer,
} from 'src/lib/utils/middleware/logout';
import syncMiddleware from 'src/lib/utils/middleware/sync';
import time from 'src/lib/utils/middleware/time';
import sync, { startSyncCron } from 'src/lib/utils/sync';
import Storage from 'src/modules/Storage';
import isTestEnv from 'src/utils/conditionals/isTestEnv';
import testHook from 'src/utils/testHook';
import waitForTestEnv from 'src/utils/waitForTestEnv';

const initialState = testHook('initialState', undefined);

const store = new Store(reducers, initialState, {
  middleware: [analyticsMiddleWare, syncMiddleware, logoutMiddleware, time],
  // purgeOnLoad: true,
  rootReducer,
  shouldLogState: true,
});

const waitForID = 'redux-store';
appLoading.register(waitForID);

/**
 * Persist the store
 */
const persist = () => {
  // Ignore storage mismatch, it does work, and we can't change the lib types
  // (although we probably can somehow)
  // @ts-ignore
  store.persistStore(Storage, blacklist, transforms).then(() => {
    if (store.getState().user.isLoggedIn) {
      /**
       * Start the sync
       */
      const start = () => {
        sync('init');

        startSyncCron();
      };

      if (isTestEnv()) {
        waitForTestEnv().then(() => {
          start();
        });
      } else {
        start();
      }
    }

    appLoading.resolve(waitForID);

    const {
      user: { id },
    } = store.getState();

    if (id) {
      analytics.setUserIfNotSet({ userId: id });
    }
  });
};

// Don't want to rehrydrate the store before the test env is ready, as the hooks
// might not be set yet
if (isTestEnv()) {
  waitForTestEnv().then(() => {
    persist();
  });
} else {
  persist();
}

export default store;
