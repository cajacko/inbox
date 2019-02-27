/* eslint no-param-reassign: 0 */
import { selectOrderedRemindersObjects } from 'src/lib/store/reminders/selectors';
import marketingCopy from 'src/lib/utils/marketingCopy';
import store from 'src/lib/utils/store';

window.addEventListener('beforeunload', (event) => {
  const reminders = selectOrderedRemindersObjects(store.getState(), null);

  const hasChanges = reminders.find(({ saveStatus }) => saveStatus === 'error' || saveStatus === 'saving');

  if (hasChanges) {
    const val = marketingCopy.get('General.UnsavedChanges');

    event.preventDefault();
    event.returnValue = val;

    return val;
  }

  return null;
});
