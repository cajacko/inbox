import api from 'src/lib/utils/api';
import makeActionCreator from 'src/lib/utils/makeActionCreator';
import store from 'src/lib/utils/store';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';

export const SET_REMINDER = 'SET_REMINDER';
export const SET_REMINDER_STATUS = 'SET_REMINDER_STATUS';
export const DELETE_REMINDER = 'DELETE_REMINDER';

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

  const reminder = {
    ...data,
    status: 'saving',
    text,
  };

  api
    // @ts-ignore
    .setReminder(reminder)
    .then(() => testHook('setReminder', () => Promise.resolve())())
    .then(() => {
      store.dispatch(setReminderStatus(reminder.id, 'saved'));
    })
    .catch(() => {
      store.dispatch(setReminderStatus(reminder.id, 'error'));
    });

  return reminder;
});

export const deleteReminder = makeActionCreator(DELETE_REMINDER, (id) => {
  const now = new Date().getTime();

  const dateModified = testHook('newReminder', now);

  api
    // @ts-ignore
    .deleteReminder({ id, dateModified })
    .then(() => testHook('deleteReminder', () => Promise.resolve())())
    .then(() => {
      store.dispatch(setReminderStatus(id, 'saved'));
    })
    .catch(() => {
      store.dispatch(setReminderStatus(id, 'error'));
    });

  return { id, dateModified };
});
