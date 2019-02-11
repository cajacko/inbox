import makeActionCreator from 'src/lib/utils/makeActionCreator';
import uuid from 'src/lib/utils/uuid';

export const SET_REMINDER = 'SET_REMINDER';

export const setReminder = makeActionCreator(SET_REMINDER, (id, text) => {
  const now = new Date().getTime();

  return {
    dateCreated: id ? undefined : now,
    dateModified: now,
    id: id || uuid(),
    text,
  };
});
