import makeActionCreator from 'src/lib/utils/makeActionCreator';
import store from 'src/lib/utils/store';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';
import { IReminder } from './reducer';

export const SET_REMINDER = 'SET_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const TOGGLE_REMINDER_DONE = 'TOGGLE_REMINDER_DONE';

export const SYNC_ACTIONS = [
  SET_REMINDER,
  DELETE_REMINDER,
  TOGGLE_REMINDER_DONE,
];

export const setReminder = makeActionCreator(
  SET_REMINDER,
  (id, text): IReminder => {
    const now = new Date().getTime();

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
        dueDate: now,
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
  const now = new Date().getTime();

  const dateModified = testHook('newReminder', now);

  return { id, dateModified };
});

export const toggleReminderDone = makeActionCreator(
  TOGGLE_REMINDER_DONE,
  (id, isDone) => {
    const now = new Date().getTime();

    const dateModified = testHook('newReminder', now);

    return { id, dateModified, isDone };
  }
);
