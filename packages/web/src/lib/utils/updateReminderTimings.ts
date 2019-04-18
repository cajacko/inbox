import { updateReminderTimings } from 'src/lib/store/reminders/actions';
import store from 'src/lib/utils/store';
import testHook from 'src/utils/testHook';
import testHookExists from 'src/utils/testHookExists';

let interval: null | NodeJS.Timeout = null;

/**
 * Is the user logged in
 */
const isLoggedIn = () => store.getState().user.isLoggedIn;

/**
 * Stop the cron
 */
export const stop = () => {
  if (interval) clearInterval(interval);
  interval = null;
};

/**
 * Start the cron
 */
export const start = (timeoutParam: number = 60000) => {
  const timeout = testHook('updateTimingsCronInterval', timeoutParam);

  interval = setInterval(() => {
    if (testHookExists('updateTimingsCron', 'none')) return;

    if (!isLoggedIn()) {
      stop();
      return;
    }

    store.dispatch(updateReminderTimings());
  }, timeout);
};
