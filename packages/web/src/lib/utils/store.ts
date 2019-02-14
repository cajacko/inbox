import blacklist from 'src/lib/config/storeBlacklist';
import Store from 'src/lib/modules/Store';
import reducers from 'src/lib/store/reducers';
import analytics from 'src/lib/utils/analytics';
import appLoading from 'src/lib/utils/appLoading';
import analyticsMiddleWare from 'src/lib/utils/middleware/analytics';
import syncMiddleware from 'src/lib/utils/middleware/sync';
import sync, { startSyncCron } from 'src/lib/utils/sync';
import Storage from 'src/modules/Storage';
import testHook from 'src/utils/testHook';

const initialState = testHook('initialState', undefined);

const store = new Store(reducers, initialState, {
  middleware: [analyticsMiddleWare, syncMiddleware],
  // purgeOnLoad: true,
  shouldLogState: true,
});

const waitForID = 'redux-store';
appLoading.register(waitForID);

// Ignore storage mismatch, it does work, and we can't change the lib types
// (although we probably can somehow)
// @ts-ignore
store.persistStore(Storage, blacklist).then(() => {
  if (store.getState().user.isLoggedIn) {
    sync('init');

    startSyncCron();
  }

  appLoading.resolve(waitForID);

  const {
    user: { id },
  } = store.getState();

  if (id) {
    analytics.setUserIfNotSet({ userId: id });
  }
});

export default store;
