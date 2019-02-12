import api from 'src/lib/utils/api';
import makeActionCreator from 'src/lib/utils/makeActionCreator';
import uuid from 'src/lib/utils/uuid';
import testHook from 'src/utils/testHook';

export const SET_REMINDER = 'SET_REMINDER';

export const setReminder = makeActionCreator(SET_REMINDER, (id, text) => {
  const now = new Date().getTime();

  const data = testHook('newReminder', {
    dateCreated: id ? undefined : now,
    dateModified: now,
    id: id || uuid(),
  });

  const reminder = {
    ...data,
    text,
  };

  // @ts-ignore
  api.setReminder(reminder);

  return reminder;
});
