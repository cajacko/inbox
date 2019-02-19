import get from 'lodash/get';
import { AnyAction, Middleware, Reducer } from 'redux';
import store from 'src/lib/utils/store';

/**
 * On rehydrate if the user is not logged in then reset the state
 */
export const middleware: Middleware = () => next => (reduxAction) => {
  if (
    reduxAction.type === 'persist/REHYDRATE' &&
    !get(reduxAction, 'payload.user.id')
  ) {
    next({ type: 'RESET_STATE' });
    store.purge();
    return;
  }

  next(reduxAction);
};

/**
 * Reset the state on logout, unless we're doing a relogin.
 *
 * On login reset the state if the user ID does not match the relogin id
 */
export const rootReducer = (reducer: Reducer<any, AnyAction>) => (
  state: any,
  action: AnyAction
) => {
  switch (action.type) {
    case 'LOGIN': {
      const nextId = get(action, 'payload.user.id');
      const prevId = get(state, 'login.reloginId');

      if (prevId && nextId !== prevId) {
        store.purge();
        return reducer(undefined, action);
      }

      return reducer(state, action);
    }
    case 'LOGOUT':
      return get(action, 'payload.reloginId')
        ? reducer(state, action)
        : reducer(undefined, action);
    default:
      return reducer(state, action);
  }
};
