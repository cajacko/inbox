import CustomDate from 'src/lib/modules/CustomDate';
import * as reminders from 'src/lib/utils/reminders';
import store from 'src/lib/utils/store';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';
import { IReminder, RepeatSimpleTypes } from './types';

export const SET_REMINDER = 'SET_REMINDER';
export const SET_REMINDERS = 'SET_REMINDERS';
export const UPDATE_REMINDER_TIMINGS = 'UPDATE_REMINDER_TIMINGS';

export const SYNC_ACTIONS = [
  SET_REMINDER,
  SET_REMINDERS,
  UPDATE_REMINDER_TIMINGS,
];

export interface ISetRemindersAction {
  type: typeof SET_REMINDERS;
  payload: IReminder[];
}

export interface IUpdateReminderTimingsAction {
  type: typeof UPDATE_REMINDER_TIMINGS;
  payload: {};
}

/**
 * Update the reminder timings
 */
export const updateReminderTimings = (): IUpdateReminderTimingsAction => ({
  payload: {},
  type: 'UPDATE_REMINDER_TIMINGS',
});

export interface ISetReminderAction {
  type: typeof SET_REMINDER;
  payload: IReminder;
}

/**
 * Get the reminder by id
 */
const getReminder = (id: string): IReminder => {
  const reminder = store.getState().reminders.remindersById[id];

  if (!reminder) throw new Error('Reminder does not exist');

  return reminder;
};

/**
 * Set reminder action
 */
export const setReminder = (
  id: string | undefined,
  text: string,
  dueDate: number | undefined
): ISetReminderAction => {
  const now = CustomDate.now();

  let existingReminder: IReminder | undefined;

  if (id) existingReminder = store.getState().reminders.remindersById[id];

  const doneDate = existingReminder ? existingReminder.doneDate : null;
  const inboxDate =
    dueDate || (existingReminder ? existingReminder.inboxDate : now);
  const snoozedDate = existingReminder ? existingReminder.snoozedDate : null;
  const deletedDate = existingReminder ? existingReminder.deletedDate : null;

  const data: {
    dateCreated: IReminder['dateCreated'];
    dateModified: IReminder['dateModified'];
    id: IReminder['id'];
    } = testHook('newReminder', {
      dateCreated: id ? undefined : now,
      dateModified: now,
      id: id || uuid(),
    });

  return {
    payload: {
      ...data,
      deletedDate,
      doneDate,
      inboxDate,
      repeated: null,
      saveStatus: 'saving',
      snoozedDate,
      text,
    },
    type: SET_REMINDER,
  };
};

/**
 * Delete reminder action
 */
export const deleteReminder = (id: string): ISetReminderAction => ({
  payload: reminders.deleteReminder(getReminder(id), CustomDate.now()),
  type: SET_REMINDER,
});

/**
 * Toggle reminder done action
 */
export const toggleReminderDone = (
  id: string,
  isDone: boolean
): ISetReminderAction => ({
  payload: reminders.toggleReminderDone(
    getReminder(id),
    isDone,
    CustomDate.now()
  ),
  type: SET_REMINDER,
});

/**
 * Action for the set due date
 */
export const setSnooze = (
  id: string,
  snoozeDate: number
): ISetReminderAction => ({
  payload: reminders.setSnooze(getReminder(id), snoozeDate, CustomDate.now()),
  type: SET_REMINDER,
});

/**
 * Action for setting the reminder repeats
 */
export const setReminderRepeat = (
  type: RepeatSimpleTypes,
  startDate: number,
  id: string
): ISetReminderAction => ({
  payload: reminders.setReminderRepeat(
    getReminder(id),
    type,
    startDate,
    CustomDate.now()
  ),
  type: SET_REMINDER,
});

/**
 * Redux action to remove the reminders repeat
 */
export const removeReminderRepeat = (id: string): ISetReminderAction => ({
  payload: reminders.removeReminderRepeat(getReminder(id), CustomDate.now()),
  type: SET_REMINDER,
});
