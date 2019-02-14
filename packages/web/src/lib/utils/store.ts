import { Middleware } from 'redux';
import blacklist from 'src/lib/config/storeBlacklist';
import Store from 'src/lib/modules/Store';
import reducers from 'src/lib/store/reducers';
import analytics from 'src/lib/utils/analytics';
import appLoading from 'src/lib/utils/appLoading';
import Storage from 'src/modules/Storage';
import testHook from 'src/utils/testHook';

/**
 * Log redux actions in analytics
 */
const analyticsMiddleWare: Middleware = () => next => (reduxAction) => {
  let action = reduxAction.type.replace('/', '_').toUpperCase();
  let category = 'REDUX';
  let label = 'REDUX';
  let value;

  if (reduxAction.analytics) {
    if (reduxAction.analytics.doNotSendEvent) {
      next(reduxAction);
      return;
    }

    if (reduxAction.analytics.action) ({ action } = reduxAction.analytics);
    if (reduxAction.analytics.category) ({ category } = reduxAction.analytics);
    if (reduxAction.analytics.label) ({ label } = reduxAction.analytics);
    if (reduxAction.analytics.value) ({ value } = reduxAction.analytics);
  }

  analytics.trackEvent(action, category, label, value, true);
  next(reduxAction);
};

const initialState = testHook('initialState', undefined);

const store = new Store(reducers, initialState, {
  middleware: [analyticsMiddleWare],
  // purgeOnLoad: true,
  shouldLogState: true,
});

const waitForID = 'redux-store';
appLoading.register(waitForID);

// Ignore storage mismatch, it does work, and we can't change the lib types
// (although we probably can somehow)
// @ts-ignore
store.persistStore(Storage, blacklist).then(() => {
  appLoading.resolve(waitForID);

  const {
    user: { id },
  } = store.getState();

  if (id) {
    analytics.setUserIfNotSet({ userId: id });
  }
});

export default store;
