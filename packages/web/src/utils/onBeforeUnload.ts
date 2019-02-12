/* eslint no-param-reassign: 0 */
import { selectOrderReminders } from 'src/lib/store/reminders/selectors';
import marketingCopy from 'src/lib/utils/marketingCopy';
import store from 'src/lib/utils/store';

window.addEventListener('beforeunload', (event) => {
  const reminders = selectOrderReminders(store.getState());

  const hasChanges = reminders.find(({ status }) => status === 'error' || status === 'saving');

  if (hasChanges) {
    const val = marketingCopy.get('General.UnsavedChanges');

    event.preventDefault();
    event.returnValue = val;

    return val;
  }

  return null;
});
