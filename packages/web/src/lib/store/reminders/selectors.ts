/* eslint id-length: 0 */
import { IState } from 'src/lib/store/reducers';

export type SelectorStatus =
  | 'DELETED'
  | 'INBOX'
  | 'DONE'
  | 'REPEATED'
  | 'SNOOZED';

/**
 * Select the reminders from the store and order them, only returning the keys
 */
export const selectOrderedRemindersKeys = (
  { reminders: { remindersByList } }: IState,
  list: SelectorStatus
) => {
  switch (list) {
    case 'INBOX':
      return remindersByList.inbox;
    case 'DELETED':
      return remindersByList.deleted;
    case 'DONE':
      return remindersByList.done;
    case 'REPEATED':
      return remindersByList.repeated;
    case 'SNOOZED':
      return remindersByList.snoozed;
    default:
      throw new Error('Oh no');
  }
};

/**
 * Is the reminder a repeated one or not
 */
export const isRepeated = (state: IState, id: string) => {
  if (!id) return false;

  const reminder = state.reminders.remindersById[id];

  if (!reminder) return false;

  return !!reminder.repeated;
};

/**
 * Get the repeat text to show
 */
export const getRepeatText = (state: IState, id?: string) => {
  // TODO: Actually decide
  if (state) return 'Does not repeat';

  return '';
};
