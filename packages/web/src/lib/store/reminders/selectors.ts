/* eslint id-length: 0 */
import { createSelector } from 'reselect';
import { IState } from 'src/lib/store/reducers';
import { IReminder } from 'src/lib/store/reminders/reducer';

const selectAllReminders = createSelector<
  IState,
  IState['reminders'],
  IReminder[]
  >(
    ({ reminders }) => reminders,
    reminders => Object.values(reminders)
  );

const orderReminders = createSelector<IReminder[], IReminder[], IReminder[]>(
  reminders => reminders,
  reminders => reminders.sort((a, b) => b.dateModified - a.dateModified)
);

/**
 * Select the reminders from the store and order them
 */
export const selectOrderReminders = (state: IState) =>
  orderReminders(selectAllReminders(state));
