/* eslint id-length: 0 */
import { createSelector } from 'reselect';
import { IState } from 'src/lib/store/reducers';
import { IReminder } from 'src/lib/store/reminders/reducer';

const selectAllReminders = createSelector<
  IState,
  IState['reminders'],
  string[]
  >(
    ({ reminders }) => reminders,
    reminders =>
      Object.keys(reminders).filter(id => !reminders[id].deleted)
  );

const getReminderObjectList = createSelector<
  { list: string[]; state: IState },
  string[],
  IState['reminders'],
  IReminder[]
  >(
    ({ list }) => list,
    ({ state: { reminders } }) => reminders,
    (list, reminders) => list.map(id => reminders[id])
  );

const orderReminders = createSelector<IReminder[], IReminder[], IReminder[]>(
  reminders => reminders,
  list => list.sort((a, b) => b.dateModified - a.dateModified)
);

const selectReminderListAsObjects = createSelector<
  IReminder[],
  IReminder[],
  string[]
  >(
    reminders => reminders,
    reminders => reminders.map(({ id }) => id)
  );

/**
 * Select the reminders from the store and order them
 */
export const selectOrderedRemindersObjects = (state: IState) => {
  const reminders = getReminderObjectList({
    list: selectAllReminders(state),
    state,
  });

  return orderReminders(reminders);
};

/**
 * Select the reminders from the store and order them, only returning the keys
 */
export const selectOrderedRemindersKeys = (state: IState) =>
  selectReminderListAsObjects(selectOrderedRemindersObjects(state));
