import { Middleware } from 'redux';
import SYNC_ACTIONS from 'src/lib/config/syncActions';
import store from 'src/lib/utils/store';
import sync from 'src/lib/utils/sync';

/**
 * Log redux actions in analytics
 */
const analyticsMiddleWare: Middleware = () => next => (reduxAction) => {
  next(reduxAction);

  if (
    SYNC_ACTIONS.includes(reduxAction.type) &&
    store.getState().user.isLoggedIn
  ) {
    sync('action');
  }
};

export default analyticsMiddleWare;
