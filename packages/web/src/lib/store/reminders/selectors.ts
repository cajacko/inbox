/* eslint id-length: 0 */
import { createSelector } from 'reselect';
import CustomDate from 'src/lib/modules/CustomDate';
import { IState } from 'src/lib/store/reducers';
import { IReminder, IRepeat } from 'src/lib/store/reminders/reducer';

interface IReminderExtra extends IReminder {
  extra: {
    isSnoozed: boolean;
    now: number;
  };
}

interface IRemindersExtra {
  [key: string]: IReminderExtra;
}

export type SelectorStatus =
  | IReminder['status']
  | null
  | 'REPEATED'
  | 'SNOOZED';

/**
 * Get the next occurrence of a repeat reminder
 */
const getNextOccurrenceFrom = (
  { type, startDate }: IRepeat,
  fromDate: number
): number => {
  //  TODO: What happens if day does not exist in month or year?
  let increment: (date: CustomDate) => void;

  switch (type) {
    case 'DAILY':
      increment = (date: CustomDate) => {
        date.setDate(date.getDate() + 1);
      };
      break;
    case 'WEEKLY':
      increment = (date: CustomDate) => {
        date.setDate(date.getDate() + 7);
      };
      break;
    case 'MONTHLY':
      increment = (date: CustomDate) => {
        date.setMonth(date.getMonth() + 1);
      };
      break;
    case 'YEARLY':
      increment = (date: CustomDate) => {
        date.setFullYear(date.getFullYear() + 1);
      };
      break;
    default:
      throw new Error('Oh no');
  }

  const date2 = new CustomDate(startDate);

  while (date2.getTime() < fromDate) {
    increment(date2);
  }

  console.log('getNextOccurrenceFrom', date2.toDate());

  return date2.getTime();
};

const selectRemindersByStatus = createSelector<
  IRemindersExtra,
  IRemindersExtra,
  SelectorStatus,
  SelectorStatus,
  IRemindersExtra,
  SelectorStatus,
  string[]
  >(
    (reminders: IRemindersExtra): IRemindersExtra => reminders,
    (reminders: IRemindersExtra, status: SelectorStatus): SelectorStatus =>
      status,
    (reminders: IRemindersExtra, status: SelectorStatus) => {
      const keys = Object.keys(reminders);

      if (!status) return keys;

      return keys.filter((id) => {
        const reminder = reminders[id];

        switch (status) {
          case 'SNOOZED':
            return reminder.extra.isSnoozed;
          case 'REPEATED':
            return !!reminder.repeat;
          case 'INBOX': {
            if (reminder.extra.isSnoozed) return false;
            if (reminder.status === 'DELETED') return false;
            if (reminder.status === 'INBOX') return true;

            // When marked as done the dueDate should have updated so
            // we can see if the there's a repeat occurrence date in between
            // dueDate and now. That's how we figure it out
            if (reminder.repeat) {
              const nextOccurrenceDate = getNextOccurrenceFrom(
                reminder.repeat,
                reminder.dueDate
              );

              return nextOccurrenceDate < reminder.extra.now;
            }

            return false;
          }
          default:
            return reminder.status === status;
        }
      });
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

const getRemindersExtra = createSelector<
  IState['reminders'],
  IState['reminders'],
  number,
  number,
  IState['reminders'],
  number,
  IRemindersExtra
  >(
    (reminders: IState['reminders']): IState['reminders'] => reminders,
    (reminders: IState['reminders'], now: number): number => now,
    (reminders: IState['reminders'], now: number): IRemindersExtra => {
      const val: IRemindersExtra = {};

      return Object.values(reminders).reduce(
        (acc, reminder) => ({
          ...acc,
          [reminder.id]: {
            ...reminder,
            extra: {
              isSnoozed: reminder.dueDate > now,
              now,
            },
          },
        }),
        val
      );
    }
  );

/**
 * Select the reminders from the store and order them
 */
export const selectOrderedRemindersObjects = (
  state: IState,
  list: SelectorStatus
) => {
  // const now = CustomDate.now();
  const now = new CustomDate('2019-04-20 12:00:00').getTime();
  const remindersExtra = getRemindersExtra(state.reminders, now);

  const reminders = getReminderObjectList({
    list: selectRemindersByStatus(remindersExtra, list),
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
export const isRepeated = (state: IState, id: string) => {
  if (!id) return false;

  const reminder = state.reminders[id];

  if (!reminder) return false;

  return !!reminder.repeat;
};

/**
 * Get the repeat text to show
 */
export const getRepeatText = (state: IState, id?: string) => {
  // TODO: Actually decide
  if (state) return 'Does not repeat';

  return '';
};
