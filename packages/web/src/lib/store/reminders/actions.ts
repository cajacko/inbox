import CustomDate from 'src/lib/modules/CustomDate';
import makeActionCreator from 'src/lib/utils/makeActionCreator';
import store from 'src/lib/utils/store';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';
import { IReminder } from './reducer';

export const SET_REMINDER = 'SET_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const TOGGLE_REMINDER_DONE = 'TOGGLE_REMINDER_DONE';
export const UPDATE_SNOOZED = 'UPDATE_SNOOZED';
export const SET_DUE_DATE = 'SET_DUE_DATE';
export const SET_REMINDER_REPEAT = 'SET_REMINDER_REPEAT';

export const SYNC_ACTIONS = [
  SET_REMINDER,
  DELETE_REMINDER,
  TOGGLE_REMINDER_DONE,
  SET_DUE_DATE,
];

export const setReminder = makeActionCreator(
  SET_REMINDER,
  (id, text, dueDate): IReminder => {
    const now = CustomDate.now();

    const existingReminder = store.getState().reminders[id];

    const status: IReminder['status'] = existingReminder
      ? existingReminder.status
      : 'INBOX';

    const data: {
      dateCreated: IReminder['dateCreated'];
      dateModified: IReminder['dateModified'];
      dueDate: IReminder['dueDate'];
      id: IReminder['id'];
      } = testHook('newReminder', {
        dateCreated: id ? undefined : now,
        dateModified: now,
        dueDate: dueDate || now,
        id: id || uuid(),
      });

    return {
      ...data,
      saveStatus: 'saving',
      status,
      text,
    };
  }
);

export const deleteReminder = makeActionCreator(DELETE_REMINDER, (id) => {
  const now = CustomDate.now();

  const dateModified = testHook('newReminder', now);

  return { id, dateModified };
});

export const toggleReminderDone = makeActionCreator(
  TOGGLE_REMINDER_DONE,
  (id, isDone) => {
    const now = CustomDate.now();

    const dateModified = testHook('newReminder', now);

    return { id, dateModified, isDone };
  }
);

export const updateSnoozed = makeActionCreator(UPDATE_SNOOZED);

export const setDueDate = makeActionCreator(SET_DUE_DATE, 'id', 'dueDate');

export const setReminderRepeat = makeActionCreator(SET_REMINDER_REPEAT, 'payload');