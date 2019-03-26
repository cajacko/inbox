/* eslint id-length: 0 */
import { createSelector } from 'reselect';
import { IState } from 'src/lib/store/reducers';
import { IReminder } from 'src/lib/store/reminders/reducer';

export type SelectorStatus = IReminder['status'] | null | 'REPEATED';

const selectAllReminders = createSelector<
  IState,
  IState,
  SelectorStatus,
  SelectorStatus,
  IState['reminders'],
  SelectorStatus,
  string[]
  >(
    ({ reminders }: IState): IState['reminders'] => reminders,
    (state: IState, status: SelectorStatus): SelectorStatus => status,
    (reminders: IState['reminders'], status: SelectorStatus) => {
      const keys = Object.keys(reminders);

      if (!status) return keys;

      return keys.filter(id => reminders[id].status === status);
    }
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
  list => list.sort((a, b) => b.dueDate - a.dueDate)
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
export const selectOrderedRemindersObjects = (
  state: IState,
  list: SelectorStatus
) => {
  const reminders = getReminderObjectList({
    list: selectAllReminders(state, list),
    state,
  });

  return orderReminders(reminders);
};

/**
 * Select the reminders from the store and order them, only returning the keys
 */
export const selectOrderedRemindersKeys = (
  state: IState,
  list: SelectorStatus
) => selectReminderListAsObjects(selectOrderedRemindersObjects(state, list));

/**
 * Is the reminder a repeated one or not
 */
export const isRepeated = (id: string, state: IState) => {
  // TODO: Actually decide
  if (state) return true;

  return false;
};
