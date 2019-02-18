import makeActionCreator from 'src/lib/utils/makeActionCreator';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';

export const SET_REMINDER = 'SET_REMINDER';
export const SET_REMINDER_STATUS = 'SET_REMINDER_STATUS';
export const DELETE_REMINDER = 'DELETE_REMINDER';

export const SYNC_ACTIONS = [SET_REMINDER, DELETE_REMINDER];

export const setReminderStatus = makeActionCreator(
  SET_REMINDER_STATUS,
  'id',
  'status'
);

export const setReminder = makeActionCreator(SET_REMINDER, (id, text) => {
  const now = new Date().getTime();

  const data = testHook('newReminder', {
    dateCreated: id ? undefined : now,
    dateModified: now,
    id: id || uuid(),
  });

  return {
    ...data,
    status: 'saving',
    text,
  };
});

export const deleteReminder = makeActionCreator(DELETE_REMINDER, (id) => {
  const now = new Date().getTime();

  const dateModified = testHook('newReminder', now);

  return { id, dateModified };
});
