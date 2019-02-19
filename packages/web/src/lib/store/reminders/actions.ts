import makeActionCreator from 'src/lib/utils/makeActionCreator';
import store from 'src/lib/utils/store';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';
import { IReminder } from './reducer';

export const SET_REMINDER = 'SET_REMINDER';
export const SET_REMINDER_SAVE_STATUS = 'SET_REMINDER_SAVE_STATUS';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const MARK_REMINDER_AS_DONE = 'MARK_REMINDER_AS_DONE';

export const SYNC_ACTIONS = [SET_REMINDER, DELETE_REMINDER];

export const setReminderSaveStatus = makeActionCreator(
  SET_REMINDER_SAVE_STATUS,
  'id',
  'saveStatus'
);

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
      id: IReminder['id'];
      } = testHook('newReminder', {
        dateCreated: id ? undefined : now,
        dateModified: now,
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

export const markReminderAsDone = makeActionCreator(
  MARK_REMINDER_AS_DONE,
  (id) => {
    const now = new Date().getTime();

    const dateModified = testHook('newReminder', now);

    return { id, dateModified };
  }
);
