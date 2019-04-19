import cloneDeep from 'lodash/cloneDeep';
import {
  IReminder,
  IState,
  Repeated,
  RepeatSimpleTypes,
} from 'src/lib/store/types';
import getNextOccurrence from 'src/lib/utils/getNextOccurrence';

type ReminderProps < T extends keyof IReminder > = T;
type OrderProps = ReminderProps<
  'deletedDate' | 'doneDate' | 'inboxDate' | 'snoozedDate' | 'repeated'
>;

const dateKeys = [
  'dateModified',
  'deletedDate',
  'doneDate',
  'inboxDate',
  'repeated',
  'snoozedDate',
];

type DateValue < T = number > = T | null | 'KEEP_PREV';

interface IDates {
  dateModified: DateValue;
  deletedDate: DateValue;
  doneDate: DateValue;
  inboxDate: DateValue;
  repeated: DateValue<Repeated>;
  snoozedDate: DateValue;
}

/**
 * Edit all the dates
 */
const editDates = (reminder: IReminder, dates: IDates): IReminder => {
  const newReminder = cloneDeep(reminder);

  dateKeys.forEach((key: keyof IDates) => {
    const val = dates[key];

    if (val === 'KEEP_PREV') return;

    newReminder[key] = val;
  });

  return newReminder;
};

/**
 * Add reminders to their relevant lists
 */
export const addRemindersToLists = (state: IState['reminders']) => {
  const lists: IState['reminders']['remindersByList'] = {
    deleted: [],
    done: [],
    inbox: [],
    repeated: [],
    snoozed: [],
  };

  Object.values(state.remindersById).forEach((reminder) => {
    if (!reminder) return;

    if (reminder.deletedDate) {
      lists.deleted.push(reminder.id);
      return;
    }

    if (reminder.repeated) lists.repeated.push(reminder.id);

    if (reminder.snoozedDate && !reminder.doneDate) {
      lists.snoozed.push(reminder.id);
    }

    /**
     * Do not add the reminder to the inbox if there is no inboxDate or the
     * reminder has been marked as done and there's no repeat (As this should
     * only be in done)
     */
    const shouldAddToInbox = (): boolean => {
      if (!reminder.inboxDate) return false;
      if (reminder.doneDate && !reminder.repeated) return false;

      return true;
    };

    if (shouldAddToInbox()) lists.inbox.push(reminder.id);
    if (reminder.doneDate) lists.done.push(reminder.id);
  });

  return lists;
};

/**
 * Update any timings on a reminder based off the current time
 */
export const updateReminderTiming = (
  reminder: IReminder,
  time: number
): IReminder => {
  let newReminder = reminder;

  if (reminder.snoozedDate && reminder.snoozedDate < time) {
    newReminder = editDates(newReminder, {
      dateModified: time,
      deletedDate: null,
      doneDate: null,
      inboxDate: reminder.snoozedDate,
      repeated: 'KEEP_PREV',
      snoozedDate: null,
    });
  }

  if (reminder.repeated && !reminder.snoozedDate) {
    const lastTime = reminder.inboxDate || reminder.doneDate;

    if (lastTime) {
      const nextOccurrence = getNextOccurrence(reminder.repeated, lastTime);

      if (nextOccurrence < time) {
        newReminder = editDates(newReminder, {
          dateModified: time,
          deletedDate: null,
          doneDate: null,
          inboxDate: nextOccurrence,
          repeated: 'KEEP_PREV',
          snoozedDate: null,
        });
      }
    }
  }

  return newReminder;
};

/**
 * Figure out the sort result given 2 reminders and the prop to sort by
 */
export const sortReminders = (
  reminderA: IReminder | undefined,
  reminderB: IReminder | undefined,
  time: number
) => (prop: OrderProps): number => {
  const AFirst = -1;
  const BFirst = -AFirst;

  if (!reminderA) return BFirst;
  if (!reminderB) return AFirst;

  if (prop === 'repeated') {
    if (!reminderA.repeated) return BFirst;
    if (!reminderB.repeated) return AFirst;

    if (
      getNextOccurrence(reminderA.repeated, time) >
      getNextOccurrence(reminderB.repeated, time)
    ) {
      return BFirst;
    }

    return AFirst;
  }

  const propA = reminderA[prop];
  const propB = reminderB[prop];

  if (!propA) return BFirst;
  if (!propB) return AFirst;

  if (propA > propB) return BFirst;
  return AFirst;
};

/**
 * Mark as reminder as deleted
 */
export const deleteReminder = (
  reminder: IReminder,
  dateModified: number
): IReminder =>
  editDates(reminder, {
    dateModified,
    deletedDate: dateModified,
    doneDate: null,
    inboxDate: null,
    repeated: 'KEEP_PREV',
    snoozedDate: null,
  });

/**
 * Toggle the done status of a reminder
 */
export const toggleReminderDone = (
  reminder: IReminder,
  isDone: boolean,
  dateModified: number
): IReminder => {
  if (isDone) {
    return editDates(reminder, {
      dateModified,
      deletedDate: null,
      doneDate: dateModified,
      inboxDate: null,
      repeated: 'KEEP_PREV',
      snoozedDate: null,
    });
  }

  return editDates(reminder, {
    dateModified,
    deletedDate: null,
    doneDate: null,
    inboxDate: dateModified,
    repeated: 'KEEP_PREV',
    snoozedDate: null,
  });
};

/**
 * Set the snooze date of a reminder
 */
export const setSnooze = (
  reminder: IReminder,
  snoozedDate: number,
  dateModified: number
): IReminder =>
  editDates(reminder, {
    dateModified,
    deletedDate: null,
    doneDate: null,
    inboxDate: null,
    repeated: 'KEEP_PREV',
    snoozedDate,
  });

/**
 * Set a repeat on the reminder
 */
export const setReminderRepeat = (
  reminder: IReminder,
  type: RepeatSimpleTypes,
  startDate: number,
  dateModified: number
): IReminder =>
  editDates(reminder, {
    dateModified,
    deletedDate: null,
    doneDate: 'KEEP_PREV',
    inboxDate: 'KEEP_PREV',
    repeated: {
      startDate,
      type,
    },
    snoozedDate: 'KEEP_PREV',
  });

/**
 * Remove the repeat on a reminder
 */
export const removeReminderRepeat = (
  reminder: IReminder,
  dateModified: number
): IReminder =>
  editDates(reminder, {
    dateModified,
    deletedDate: null,
    doneDate: 'KEEP_PREV',
    inboxDate: 'KEEP_PREV',
    repeated: null,
    snoozedDate: 'KEEP_PREV',
  });
