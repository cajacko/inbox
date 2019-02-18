import { Middleware } from 'redux';
import analytics from 'src/lib/utils/analytics';

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

export default analyticsMiddleWare;
