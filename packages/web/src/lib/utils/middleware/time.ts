import { Middleware } from 'redux';
import CustomDate from 'src/lib/modules/CustomDate';

/**
 * Add the time to the action
 */
const timeMiddleware: Middleware = () => next => (reduxAction) => {
  const time = CustomDate.now();

  const action = Object.assign({}, reduxAction);

  if (typeof reduxAction.payload === 'object') {
    action.time = time;
  }

  next({ time, ...reduxAction });
};

export default timeMiddleware;
