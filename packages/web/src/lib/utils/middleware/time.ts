import { Middleware } from 'redux';

/**
 * Add the time to the action
 */
const timeMiddleware: Middleware = () => next => (reduxAction) => {
  const time = new Date().getTime();

  const action = Object.assign({}, reduxAction);

  if (typeof reduxAction.payload === 'object') {
    action.payload.time = time;
  }

  next({ time, ...reduxAction });
};

export default timeMiddleware;
